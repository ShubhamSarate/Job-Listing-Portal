import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { Job } from "../models/job.model.js";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import crypto from "crypto";
import sendVerificationEmail from "../utils/sendVerificationEmail.js";

// SignUp
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const profileFile = req.files?.file?.[0];

    if (!profileFile) {
      return res.status(400).json({
        success: false,
        message: "Profile image is required",
      });
    }

    const fileUri = getDataUri(profileFile);

    const cloudResponse = await cloudinary.uploader.upload(
      fileUri.content,
      { resource_type: "image" }
    );

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      isVerified: false,
      verificationToken,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    await sendVerificationEmail(email, verificationToken);

    return res.status(201).json({
      success: true,
      message: "User created. Verify email.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Login
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Invalid Credentials",
        success: false,
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect Credentials",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does not match with mention role",
        success: false,
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
      savedJobs: user.savedJobs,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, bio, skills, phoneNumber } = req.body;
    const userId = req.id;

    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
        success: false,
      });
    }

    // Ensure profile object exists
    if (!user.profile) {
      user.profile = {};
    }

    // Update basic fields
    if (fullname?.trim()) user.fullname = fullname.trim();
    if (email?.trim()) user.email = email.trim();
    if (phoneNumber) user.phoneNumber = phoneNumber;

    // Update profile fields
    if (bio?.trim()) user.profile.bio = bio.trim();

    if (skills?.length) {
      user.profile.skills = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);
    }

    /*
      Because multer now uses .fields(), uploaded files are available as:
      req.files.file[0]          -> Resume
      req.files.profilePhoto[0]  -> Profile image
    */

    // Update Resume
    if (req.files?.file?.[0]) {
      const resumeFile = req.files.file[0];
      const fileUri = getDataUri(resumeFile);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "auto",
      });

      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalname = resumeFile.originalname;
    }

    // Update Profile Photo
    if (req.files?.profilePhoto?.[0]) {
      const photoFile = req.files.profilePhoto[0];
      const fileUri = getDataUri(photoFile);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "image",
      });

      // Replace old profile photo URL with the new one
      user.profile.profilePhoto = cloudResponse.secure_url;
    }

    // Mark nested object modified
    user.markModified("profile");

    // Save changes
    await user.save();

    // Get fresh updated user
    const updatedUser = await User.findById(userId);

    return res.status(200).json({
      message: "Profile Updated Successfully",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.log("UPDATE PROFILE ERROR:", error);

    return res.status(500).json({
      message: error.message || "Server Error",
      success: false,
    });
  }
};

// Save / Remove Saved Job
export const saveJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "Logged In First",
        success: false,
      });
    }

    // Ensure savedJobs exists
    if (!user.savedJobs) {
      user.savedJobs = [];
    }

    // Remove if already saved
    const alreadySaved = user.savedJobs.some((id) => id.toString() === jobId);

    if (alreadySaved) {
      user.savedJobs = user.savedJobs.filter((id) => id.toString() !== jobId);

      await user.save();

      return res.status(200).json({
        message: "Job removed from saved",
        success: true,
        isSaved: false,
      });
    }

    // Save job
    user.savedJobs.push(jobId);
    await user.save();

    return res.status(200).json({
      message: "Job saved successfully",
      success: true,
      isSaved: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

// Get Saved Jobs
export const getSavedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.id).populate({
      path: "savedJobs",
      populate: {
        path: "company",
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      savedJobs: user.savedJobs || [],
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    console.log("TOKEN RECEIVED:", token);

    const user = await User.findOne({ verificationToken: token });

    // token not found
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // already verified (should rarely hit because token is cleared)
    if (user.isVerified) {
      return res.status(200).json({
        success: true,
        message: "Email already verified. Please login.",
      });
    }

    user.isVerified = true;
    user.verificationToken = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};