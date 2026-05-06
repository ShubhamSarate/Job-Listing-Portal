import { Job } from "../models/job.model.js";

// For Recruiter
// Creating Job
export const jobPost = async (req,res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        
        return res.status(201).json({
            message: "New Job created Successfully",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

// For Employees
export const getAllJobs = async (req,res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                {title: {$regex: keyword, $options: "i"}},
                {description: {$regex: keyword, $options: "i"}},
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if(!jobs){
            return res.status(404).json({
                message: "Jobs Not Found",
                success: false
            });
        };

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error); 
    }
};   

// For Employees
export const getJobById = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications'
        });
        if(!job){
            return res.status(404).json({
                message: "Job Not Found",
                success: false
            });
        };

        return res.status(200).json({
            success: true,
            job
        })
    } catch (error) {
        console.log(error);
    }
};

// For Recruiter getting own posted jobs
export const getAdminJobs = async (req,res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId}).populate({
            path: 'company',
            createdAt: -1
        });
        if(!jobs){
            return res.status(404).json({
                message: "Jobs Not Found",
                success: false
            });
        };

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateJob = async (req, res) => {
  try {
    const { title, description, requirements, salary, location, jobType, experience, position } = req.body;

    const updateData = {
      title,
      description,
      requirements: requirements?.split(","),
      salary,
      location,
      jobType,
      experienceLevel: experience,
      position,
    };

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job updated successfully",
      job,
      success: true,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};