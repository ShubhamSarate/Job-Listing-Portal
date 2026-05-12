import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetFilterjobs from "@/hooks/useGetFilterJobs";

const filterData = [
  {
    filterType: "Location",
    array: ["Mumbai", "Pune", "Hyderabad", "Chennai", "Delhi"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "AI Developer",
      "Data Science",
    ],
  },
  // {
  //   filterType: "Salary",
  //   array: ["0 - 40k", "41 - 1lakh", "1lakh - 5lakhs"],
  // },
];

const FilterCard = () => {
  useGetFilterjobs();
  const [selectedValues, setSelectedValues] = useState([]);
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValues(
      (prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value) // remove
          : [...prev, value], // add
    );
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValues)); // send array
  }, [selectedValues, dispatch]);

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />

      {filterData.map((data, index) => (
        <div key={index}>
          <h1 className="font-bold text-lg my-4 mt-6">{data.filterType}</h1>

          {data.array.map((item, idx) => {
            const itemId = `id-${index}-${idx}`;

            return (
              <div key={itemId} className="flex items-center space-x-2 my-2">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-purple-600 cursor-pointer"
                  id={itemId}
                  checked={selectedValues.includes(item)}
                  onChange={() => changeHandler(item)}
                />
                <Label htmlFor={itemId}>{item}</Label>
              </div>
            );
          })}
        </div>
      ))}
      <button
        className="mt-10 px-4 py-2 bg-black rounded-full text-white"
        onClick={() => {
          setSelectedValues([]); // reset UI
          dispatch(setSearchedQuery([])); // reset filter
        }}
      >
        Show all Jobs
      </button>
    </div>
  );
};

export default FilterCard;
