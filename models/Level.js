import mongoose from "mongoose";

const levelSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    order: { type: Number, required: true },
    title: { type: String },
    description: { type: String },
    category: { type: String, enum: ["JLPT", "Business"], default: "JLPT" },
  },
  { timestamps: true }
);

export default mongoose.model("Level", levelSchema);
