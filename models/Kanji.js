import mongoose from "mongoose";

const kanjiSchema = new mongoose.Schema(
  {
    character: { type: String, required: true, unique: true },
    onyomi: [String],
    kunyomi: [String],
    meaning: [String],
    strokes: { type: Number },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level",
      required: true,
    },
    examples: [
      {
        word: { type: String },
        reading: { type: String },
        meaning: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Kanji", kanjiSchema);
