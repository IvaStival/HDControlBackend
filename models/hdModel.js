import mongoose from "mongoose";

const Schema = mongoose.Schema;

const hdSchema = new Schema(
  {
    title: { type: String, required: true },
    size: { type: String, required: true },
    code: { type: String, required: true },
    qrcode: { type: String, required: true },
    is_home: { type: Boolean, required: false, default: true },
    localizationId: { type: String, required: false },
    type: { type: String, required: true },
    // The type can receive three value types:
    // 1 -> Normal HDD type
    // 2 -> SSD HDD type
  },
  { timestamps: true }
);

hdSchema.index({ title: 1 }, { unique: true });

const Hd = mongoose.model("hd", hdSchema);

export default Hd;
