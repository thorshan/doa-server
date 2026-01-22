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
      required: false,
    },

    isLevelExam: {
      type: Boolean,
      default: false, 
    },
    levelTag: {
      type: String,
      enum: ["Basic", "N5", "N4", "N3", "N2", "N1", "Business"],
      index: true,
    },
    // -------------------------------

    completedModules: {
      grammar: { type: Boolean, default: false },
      speaking: { type: Boolean, default: false },
      renshuuA: { type: Boolean, default: false },
      renshuuB: { type: Boolean, default: false },
      renshuuC: { type: Boolean, default: false },
    },

    testPassed: { type: Boolean, default: false },
    score: { type: Number, default: 0 },

    attempts: [
      {
        score: Number,
        totalQuestions: Number,
        completedAt: { type: Date, default: Date.now },
      },
    ],

    passedAt: { type: Date },
    lastAccessedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

userProgressSchema.index(
  { user: 1, chapter: 1, levelTag: 1, isLevelExam: 1 },
  { unique: true }
);

export default mongoose.model("UserProgress", userProgressSchema);
