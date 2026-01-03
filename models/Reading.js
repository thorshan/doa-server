import mongoose from "mongoose";

const readingSchema = new mongoose.Schema(
  {
    level: { type: mongoose.Schema.Types.ObjectId, ref: "Level", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    questions: [
      {
        question: { type: String },
        options: [String],
        answer: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Reading", readingSchema);
