import express from "express";
import Job from "../controllers/jobController.js";

const jobRoutes = express.Router();

jobRoutes.post("/new", Job.createJob);
jobRoutes.patch("/update/:id", Job.updateJob);
jobRoutes.delete("/delete/:id", Job.deleteJob);
jobRoutes.get("/jobs", Job.getJobs);
jobRoutes.get("/job/:id", Job.getJobById);

export default jobRoutes;
