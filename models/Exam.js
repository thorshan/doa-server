import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    examType: {
      type: String,
      enum: [
        "Level Test",
        "Chapter Test",
        "Module Final",
        "Mock JLPT",
        "Old Question",
        "Mini Quiz",
      ],
      required: true,
    },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level",
      required: true,
    },
    durationMinutes: { type: Number, default: 30 },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    passingScorePercentage: { type: Number, default: 80 },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Exam", examSchema);
