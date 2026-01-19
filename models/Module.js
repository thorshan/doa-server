import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Module name is required"],
      trim: true,
    },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level",
      required: [true, "Module must belong to a level"],
    },
    chapters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
      },
    ],
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: false
    },
    passingScorePercentage: {
      type: Number,
      default: 80
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Module = mongoose.model("Module", moduleSchema);
export default Module;