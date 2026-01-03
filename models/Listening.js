import mongoose from "mongoose";

const listeningSchema = new mongoose.Schema(
  {
    level: { type: mongoose.Schema.Types.ObjectId, ref: "Level", required: true },
    title: { type: String, required: true },
    audioUrl: { type: String, required: true },
    transcript: { type: String },
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

export default mongoose.model("Listening", listeningSchema);
