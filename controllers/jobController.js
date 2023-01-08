import Job from "../models/Job.js";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import checkPermissions from "../utils/checkPermissions.js";

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
  const { id: jobId } = req.params;
  // console.log(jobId);

  const { company, position } = req.body;

  if (!company || !position) {
    throw new BadRequestError("Please provide all values!");
  }

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }

  // check permission 👍
  // console.log(typeof req.user.userId); // string
  // console.log(typeof job.createdBy); // object

  checkPermissions(req.user, job.createdBy);

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(StatusCodes.OK).json({ updatedJob });
};

// delete job
const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id :${jobId}`);
  }

  // check Permission
  checkPermissions(req.user, job.createdBy);

  await job.remove();

  return res.status(StatusCodes.OK).json({ msg: "Success! Job removed" });
};

// show stats

const showStats = async (req, res) => {
  res.send("show stats");
};

export { createJob, getAllJobs, updateJob, deleteJob, showStats };
