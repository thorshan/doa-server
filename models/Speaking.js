import mongoose from "mongoose";

const speakingSchema = new mongoose.Schema(
  {
    level: { type: mongoose.Schema.Types.ObjectId, ref: "Level", required: true },
    title: { type: String, required: true },
    prompt: { type: String, required: true },
    exampleAnswer: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Speaking", speakingSchema);
