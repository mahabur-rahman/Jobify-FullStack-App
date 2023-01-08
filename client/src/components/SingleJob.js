import React from "react";
import moment from "moment";
import { useAppContext } from "../context/appContext";
import JobInfo from "./JobInfo";
import { Link } from "react-router-dom";
import { FaLocationArrow } from "react-icons/fa";

const SingleJob = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  status,
  createdAt,
}) => {
  const { setEditJob, deleteJob } = useAppContext();

  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");

  return (
    <>
      <h3
        style={{ color: "red", textTransform: "capitalize", fontSize: "2rem" }}
      >
        {company.charAt(0)}
      </h3>

      <h5>{position}</h5>

      <p>{company}</p>

      <div className="content">
        <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
        <JobInfo icon={<FaLocationArrow />} text={date} />
        <JobInfo icon={<FaLocationArrow />} text={jobType} />
        <div className={`status ${status}`}>{status}</div>
      </div>

      <div className="action_btn">
        <Link to="/add-job" onClick={() => setEditJob(_id)}>
          Edit
        </Link>
        <button type="button" onClick={() => deleteJob(_id)}>
          Delete
        </button>
      </div>
    </>
  );
};

export default SingleJob;
