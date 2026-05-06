import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// SignUp
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Profile image is required",
        success: false,
      });
    }

    const fileUri = getDataUri(req.file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User with this Mail already Existed",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    return res.status(200).json({
      message: "Account Created Successfully",
      success: true,
    });

  } catch (error) {
    console.log(error);
  }
}

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
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
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
  }
};

// Update
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

    // ensure profile exists
    if (!user.profile) {
      user.profile = {};
    }

    // update basic fields
    if (fullname?.trim()) user.fullname = fullname.trim();
    if (email?.trim()) user.email = email.trim();
    if (phoneNumber) user.phoneNumber = phoneNumber;

    // update nested profile
    if (bio?.trim()) user.profile.bio = bio.trim();

    if (skills?.length) {
      user.profile.skills = skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    // Cloudinary upload  
    let cloudResponse;

    if(req.file) {
      const fileUri = getDataUri(req.file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalname = req.file.originalname;
    }

    user.markModified("profile");

    await user.save();

    const updatedUser = await User.findById(userId);

    return res.status(200).json({
      message: "Profile Updated Successfully",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.log("UPDATE PROFILE ERROR:", error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};
