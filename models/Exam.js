import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    type: {
      type: String,
      enum: ["Practice", "Lesson", "Level", "Final"],
      default: "Practice",
    },

    level: { type: mongoose.Schema.Types.ObjectId, ref: "Level" },
    module: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
    grammar: { type: mongoose.Schema.Types.ObjectId, ref: "Grammar" },

    duration: Number,          // minutes
    passingScore: Number,      // %
    totalMarks: Number,

    questions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
    ],

    isRequired: { type: Boolean, default: false },
    maxAttempts: { type: Number, default: 0 }, // 0 = unlimited
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Exam", examSchema);
