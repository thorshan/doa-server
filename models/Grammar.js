import mongoose from "mongoose";

const grammarSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    structure: { type: String },
    meaning: { type: String },
    explanation: { type: String },
    level: { type: mongoose.Schema.Types.ObjectId, ref: "Level", required: true },
    examples: [
      {
        jp1: { type: String },
        jp2: { type: String },
        mm1: { type: String },
        mm2: { type: String },
      },
    ],
    relatedKanji: [{ type: mongoose.Schema.Types.ObjectId, ref: "Kanji" }],
    relatedVocabulary: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vocabulary" }],
    tags: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Grammar", grammarSchema);
