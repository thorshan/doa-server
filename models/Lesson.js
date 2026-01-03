import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String },
    level: { type: mongoose.Schema.Types.ObjectId, ref: "Level" },
    module: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true }, // grammar, reading, etc.
    grammarPatterns: [{ type: mongoose.Schema.Types.ObjectId, ref: "Grammar" }],
    kanji: [{ type: mongoose.Schema.Types.ObjectId, ref: "Kanji" }],
    vocabulary: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vocabulary" }],
    contentBlocks: [
      {
        type: {
          type: String, // text, example, audio, question
        },
        value: mongoose.Schema.Types.Mixed,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Lesson", lessonSchema);
