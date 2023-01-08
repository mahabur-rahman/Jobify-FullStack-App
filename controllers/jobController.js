import Job from "../models/Job.js";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

// create job
const createJob = async (req, res) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please provide all values!");
  }

  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);

  return res.status(StatusCodes.CREATED).json({ job });
};

// get all jobs
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });

  return res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};

// update job
const updateJob = async (req, res) => {
  res.send("update job");
};

// delete job
const deleteJob = async (req, res) => {
  res.send("delete job");
};

// show stats

const showStats = async (req, res) => {
  res.send("show stats");
};

export { createJob, getAllJobs, updateJob, deleteJob, showStats };
