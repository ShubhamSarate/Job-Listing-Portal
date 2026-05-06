import express from "express";
import { jobPost, getAllJobs, getJobById, getAdminJobs } from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { updateJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, jobPost);
router .route("/getjobs").get(isAuthenticated, getAllJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.put("/update/:id", updateJob);

export default router;