import mongoose from "mongoose";

const examAttemptSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },

    answers: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ExamQuestion",
        },
        answer: mongoose.Schema.Types.Mixed,
        isCorrect: Boolean,
        marksObtained: Number,
      },
    ],

    score: Number,
    percentage: Number,
    passed: Boolean,
    timeSpent: Number, // seconds
  },
  { timestamps: true }
);

export default mongoose.model("ExamAttempt", examAttemptSchema);
