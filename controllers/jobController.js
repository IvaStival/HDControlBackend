import Job from "../models/jobModel.js";

const createJob = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a Job data.",
    });
  }

  const job = new Job(body);

  job
    .save()
    .then(async () => {
      // return res.status(201).json({
      //   success: true,
      //   job: job,
      //   message: "Job Created",
      // });
      const result = await Job.find({});

      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Jobs not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: result,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({
        error,
        message: "Job not created.",
      });
    });
};

const updateJob = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must to provide a body to update.",
    });
  }

  try {
    const job = await Job.findOne({ _id: req.params.id });
    console.log(req.params.id);

    job.title = body.title;
    job.hdIds = body.hdIds;

    job
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: job._id,
          message: "Job Updated",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Job not updated",
        });
      });
  } catch (err) {
    return res.status(404).json({
      err,
      message: "Job not found",
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const result = await Job.findOneAndDelete({ _id: req.params.id });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Job not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error,
    });
  }
};

const getJobs = async (req, res) => {
  try {
    const result = await Job.find({});

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Jobs not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: true,
      error: error,
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const result = await Job.findOne({ _id: req.params.id });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error,
    });
  }
};

export default {
  createJob,
  updateJob,
  deleteJob,
  getJobById,
  getJobs,
};
