import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },

    type: {
      type: String,
      enum: ["mcq", "true_false", "fill_blank", "match"],
      default: "mcq",
    },

    question: { type: String, required: true },

    options: [String],           // MCQ
    correctAnswer: mongoose.Schema.Types.Mixed,

    explanation: String,
    marks: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
