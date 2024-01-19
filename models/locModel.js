import mongoose from "mongoose";

const Schema = mongoose.Schema;

const locSchema = new Schema(
  {
    location: { type: String, required: false },
    responsible: { type: String, required: false },
    city: { type: String, required: false },
    phone: { type: String, required: false },
    mail: { type: String, required: false },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

const Localization = mongoose.model("localization", locSchema);

export default Localization;
