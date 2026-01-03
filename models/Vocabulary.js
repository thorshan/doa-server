import mongoose from "mongoose";

const vocabularySchema = new mongoose.Schema(
  {
    word: { type: String, required: true },
    reading: { type: String },
    meaning: { type: String },
    kanji: [{ type: mongoose.Schema.Types.ObjectId, ref: "Kanji" }],
    level: { type: mongoose.Schema.Types.ObjectId, ref: "Level", required: true },
    audioUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Vocabulary", vocabularySchema);
