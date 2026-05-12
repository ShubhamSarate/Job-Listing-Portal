import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import useGetAlljobs from "@/hooks/useGetAlljobs";
import { motion } from "framer-motion";
import useGetFilterjobs from "@/hooks/useGetFilterJobs";

const Jobs = () => {
  useGetFilterjobs()

  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);

  // Filtering logic (multi-select safe)
  useEffect(() => {
    if (Array.isArray(searchedQuery) && searchedQuery.length > 0) {
      const filteredJobs = allJobs.filter((job) => {
        return searchedQuery.some((query) => {
          if (typeof query !== "string") return false;

          const q = query.toLowerCase();

          return (
            job?.title?.toLowerCase().includes(q) ||
            job?.description?.toLowerCase().includes(q) ||
            job?.location?.toLowerCase().includes(q)
          );
        });
      });

      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">

          {/* Sidebar */}
          <div className="w-[20%]">
            <FilterCard />
          </div>

          {/* Jobs Grid */}
          {filterJobs.length <= 0 ? (
            <span>Job not Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">

              {/* Equal height grid */}
              <div className="grid grid-cols-3 gap-4 items-stretch">
                {filterJobs.map((job) => (
                  <motion.div
                    key={job?._id}
                    className="h-full"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;