import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true }, // moji-goi, grammar, etc.
    title: { type: String },
    order: { type: Number },
    icon: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Module", moduleSchema);
