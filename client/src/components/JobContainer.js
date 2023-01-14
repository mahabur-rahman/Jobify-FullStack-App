import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Loading from "./Loading";
import SingleJob from "./SingleJob";

const JobContainer = () => {
  const {
    jobs,
    isLoading,
    page,
    totalJobs,
    getAllJobs,
    search,
    searchStatus,
    searchType,
    sort,
  } = useAppContext();

  useEffect(() => {
    getAllJobs();
  }, [page, search, searchStatus, searchType, sort]);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return <h1>No jobs to display...</h1>;
  }

  return (
    <>
      <div className="main_div">
        <h5>
          {totalJobs} job{jobs.length > 1 && "s"}
        </h5>

        <div className="all_jobs">
          {jobs.map((job) => {
            return <SingleJob key={job._id} {...job} />;
          })}
        </div>

        {/* pagination button */}
      </div>
    </>
  );
};

export default JobContainer;
