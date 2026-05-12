import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const useGetFilterjobs = () => {
  const dispatch = useDispatch();

  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {

    const fetchAllJobs = async () => {
      try {

        // HANDLE ARRAY + STRING
        const keyword = Array.isArray(searchedQuery)
          ? searchedQuery.join(",")
          : searchedQuery;

        const res = await axios.get(
          `${JOB_API_END_POINT}/getjobs?keyword=${keyword}`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchAllJobs();

  }, [searchedQuery, dispatch]);
};

export default useGetFilterjobs;