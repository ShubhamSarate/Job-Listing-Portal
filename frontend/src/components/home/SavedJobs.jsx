import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import axios from "axios";
import Job from "../jobs/Job";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/user/saved", {
          withCredentials: true,
        });

        if (res.data.success) {
          setSavedJobs(res.data.savedJobs);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSavedJobs();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-2xl mb-5">Saved Jobs</h1>

        <div className="grid grid-cols-3 gap-4">
          {savedJobs.map((job) => (
            <Job
              key={job._id}
              job={job}
              onRemoveSavedJob={(id) =>
                setSavedJobs((prev) => prev.filter((job) => job._id !== id))
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedJobs;
