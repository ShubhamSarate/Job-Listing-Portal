import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';

// Register 
export const register = async (req,res) => {
    try {
        const {fullname, email, phoneNumber, password, role} = req.body;
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message: 'User with this Mail already Existed',
                success: false
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname, 
            email,
            phoneNumber, 
            password: hashedPassword, 
            role
        });

        return res.status(200).json({
            message: "Account Created Successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// Login
export const login = async (req,res) => {
    try {
        const {email, password, role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message: 'Invalid Credentials',
                success: false
            });
        };
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: 'Invalid Credentials',
                success: false
            });
        };
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message: 'Incorrect Credentials',
                success: false
            });
        };
        if(role !== user.role){
            return res.status(400).json({
                message: 'Account does not match with mention role',
                success: false
            });
        };
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn: '1d'});

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpOnly:true, sameSite: 'strict'}).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// Logout
export const logout = async (req,res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge: 0}).json({
            message: "Logged out Successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// Update
export const updateProfile = async (req,res) => {
    try {
        const {fullname, email, bio, skills, phoneNumber} = req.body;
        const file = req.file;

        // Cloudinary

        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.id; // middleware anthentication
        let user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                message: "User Not Found",
                success: false
            });
        };

        // Updating Data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber) user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray

        // Resume

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile Updated Successfully",
            user,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}