import mongoose from "mongoose";

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
  },
  { timestamps: true },
);

export default mongoose.model("Card", CardSchema);
