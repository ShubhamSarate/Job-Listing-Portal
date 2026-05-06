import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setAllAdminJobs, setSingleJob } from "@/redux/jobSlice";

const JobSetUp = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { singleJob } = useSelector((store) => store.job);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
  });

  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        dispatch(setSingleJob(null)); // clear old job

        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (id) fetchSingleJob();
  }, [id, dispatch]);

  useEffect(() => {
    if (singleJob) {
      setInput({
        title: singleJob.title || "",
        description: singleJob.description || "",
        requirements: singleJob.requirements?.join(", ") || "",
        salary: singleJob.salary || "",
        location: singleJob.location || "",
        jobType: singleJob.jobType || "",
        experience: singleJob.experienceLevel || "",
        position: singleJob.position || "",
      });
    }
  }, [singleJob]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${id}`,
        {
          ...input,
          salary: Number(input.salary),
          experience: Number(input.experience),
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        // refresh job list
        const jobsRes = await axios.get(
          `${JOB_API_END_POINT}/getadminjobs`,
          { withCredentials: true }
        );

        dispatch(setAllAdminJobs(jobsRes.data.jobs));

        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to Update the Job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-4">
            <Button
              type="button"
              onClick={() => navigate("/admin/jobs")}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft />
              Back
            </Button>
            <h1 className="font-bold text-xl">Edit Job</h1>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input name="title" value={input.title} onChange={changeEventHandler} />
            </div>

            <div>
              <Label>Salary</Label>
              <Input type="number" name="salary" value={input.salary} onChange={changeEventHandler} />
            </div>

            <div className="col-span-2">
              <Label>Description</Label>
              <Input name="description" value={input.description} onChange={changeEventHandler} />
            </div>

            <div className="col-span-2">
              <Label>Requirements (comma separated)</Label>
              <Input name="requirements" value={input.requirements} onChange={changeEventHandler} />
            </div>

            <div>
              <Label>Location</Label>
              <Input name="location" value={input.location} onChange={changeEventHandler} />
            </div>

            <div>
              <Label>Job Type</Label>
              <Input name="jobType" value={input.jobType} onChange={changeEventHandler} />
            </div>

            <div>
              <Label>Experience (years)</Label>
              <Input type="number" name="experience" value={input.experience} onChange={changeEventHandler} />
            </div>

            <div>
              <Label>Positions</Label>
              <Input type="number" name="position" value={input.position} onChange={changeEventHandler} />
            </div>
          </div>

          {loading ? (
            <Button disabled className="w-full my-4 bg-black text-white flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 bg-black text-white hover:bg-black">
              Update Job
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default JobSetUp;