import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";

const Job = ({ job, onRemoveSavedJob }) => {
  const navigate = useNavigate();
  const jobId = job?._id;

  const [isSaved, setIsSaved] = useState(false);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;

    return Math.floor(
      timeDifference / (24 * 60 * 60 * 1000)
    );
  };

  // check saved jobs
  useEffect(() => {
    const checkSavedJob = async () => {
      try {
        const res = await axios.get(
          `${USER_API_END_POINT}/saved`,
          { withCredentials: true }
        );

        if (res.data.success) {
          const saved = res.data.savedJobs.some(
            (savedJob) => savedJob._id === jobId
          );

          setIsSaved(saved);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkSavedJob();
  }, [jobId]);

  // save / remove job
  const saveJobHandler = async () => {
    try {
      const res = await axios.get(
        `${USER_API_END_POINT}/save/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        const newSavedState = !isSaved;

        setIsSaved(newSavedState);

        // remove instantly from saved jobs page
        if (!newSavedState && onRemoveSavedJob) {
          onRemoveSavedJob(jobId);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between p-5 rounded-md shadow-xl bg-white border border-gray-100">

      <div>
        {/* Top */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {daysAgoFunction(job?.createdAt) === 0
              ? "Today"
              : `${daysAgoFunction(job?.createdAt)} days ago`}
          </p>

          <Button
            variant="outline"
            className="rounded-full border-gray-300"
            size="icon"
          >
            <Bookmark />
          </Button>
        </div>

        {/* Company */}
        <div className="flex items-center gap-2 my-2">
          <Button
            className="p-6 border-gray-300"
            variant="outline"
            size="icon"
          >
            <Avatar>
              <AvatarImage src={job?.company?.logo} />
            </Avatar>
          </Button>

          <div>
            <h1 className="font-medium text-lg">
              {job?.company?.name}
            </h1>

            <p className="text-sm text-gray-500">
              {job?.location}
            </p>
          </div>
        </div>

        {/* Job Info */}
        <div>
          <h1 className="font-bold text-lg my-2">
            {job?.title}
          </h1>

          <p className="text-sm text-gray-600 line-clamp-3">
            {job?.description}
          </p>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <Badge
            className="text-blue-700 font-bold"
            variant="outline"
          >
            {job?.position} Positions
          </Badge>

          <Badge
            className="text-[#F83002] font-bold"
            variant="outline"
          >
            {job?.jobType}
          </Badge>

          <Badge
            className="text-[#7209b7] font-bold"
            variant="outline"
          >
            {job?.salary} LPA
          </Badge>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${jobId}`)}
          variant="outline"
          className="border-gray-400"
        >
          Details
        </Button>

        <Button
          onClick={saveJobHandler}
          className={`text-white ${
            isSaved
              ? "bg-red-500 hover:bg-red-600"
              : "bg-[#7209b7] hover:bg-[#5b30a6]"
          }`}
        >
          {isSaved
            ? "Remove Saved Job"
            : "Save for Later"}
        </Button>
      </div>
    </div>
  );
};

export default Job;