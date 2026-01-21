import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    chapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },

    testPassed: {
      type: Boolean,
      default: false,
    },

    score: {
      type: Number,
      default: 0,
    },

    passedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

userProgressSchema.index({ user: 1, chapter: 1 }, { unique: true });

export default mongoose.model("UserProgress", userProgressSchema);
