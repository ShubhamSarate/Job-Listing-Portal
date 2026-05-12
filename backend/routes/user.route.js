import express from "express";
import {
  register,
  login,
  logout,
  updateProfile,
  saveJob,
  getSavedJobs,
  verifyEmail
} from "../controllers/user.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// AUTH
router.post("/register", singleUpload, register);
router.post("/login", login);
router.get("/logout", logout);

// EMAIL VERIFY (NO AUTH REQUIRED)
router.get("/verify-email/:token", verifyEmail);

// JOBS (AUTH REQUIRED)
router.get("/save/:id", isAuthenticated, saveJob);
router.get("/saved", isAuthenticated, getSavedJobs);

// PROFILE
router.put("/profile/update", isAuthenticated, singleUpload, updateProfile);

export default router;