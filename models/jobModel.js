import mongoose from "mongoose";

const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    title: { type: String, required: true },
    hdIds: { type: [String], required: false },
  },
  { timestamps: true }
);

const Job = mongoose.model("job", jobSchema);

export default Job;
