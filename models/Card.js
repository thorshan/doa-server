import mongoose from "mongoose";

const GrammarSchema = new mongoose.Schema(
  {
    pattern: {
      type: String,
      required: true, 
    },
    meaning: {
      type: String,
      required: true, 
    },
    example: {
      type: String, 
    },
  },
  { _id: false }
);

const CardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    level: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    originalContent: {
      type: String,
    },
    furigana: [
      {
        kanji: String,
        reading: String,
      },
    ],
    grammar: [GrammarSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Card", CardSchema);
