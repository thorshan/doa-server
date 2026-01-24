import mongoose from "mongoose";

// 1. Level: Section Completion (grammar, renshuu, etc.)
const completedSectionSchema = new mongoose.Schema({
  grammar: { type: Boolean, default: false },
  speaking: { type: Boolean, default: false },
  renshuuA: { type: Boolean, default: false },
  renshuuB: { type: Boolean, default: false },
  renshuuC: { type: Boolean, default: false },
}, { _id: false });

// 2. Level: Individual Chapter Progress
const chapterProgressSchema = new mongoose.Schema({
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapter",
    required: true,
  },
  isSectionCompleted: { type: Boolean, default: false }, 
  completedSection: {
    type: completedSectionSchema,
    default: () => ({}),
  },
  score: { type: Number, default: 0 }, 
}, { _id: false });

// 3. Level: Course Progress (N5, N4, etc.)
const courseProgressSchema = new mongoose.Schema({
  levelTag: {
    type: String,
    enum: ["Basic", "N5", "N4", "N3", "N2", "N1", "Business"],
    required: true,
  },
  isCompletedChapter: { type: Boolean, default: false }, 
  isCourseCompleted: { type: Boolean, default: false }, 
  completedChapter: [chapterProgressSchema],
}, { _id: false });

// Main UserProgress Schema
const userProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, 
      index: true,
    },
    courseProgress: [courseProgressSchema],
  },
  { timestamps: true }
);

export default mongoose.model("UserProgress", userProgressSchema);