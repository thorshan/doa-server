import mongoose from "mongoose";

const grammarSchema = new mongoose.Schema(
  {
    pattern: {
      type: String,
      required: [true, "Grammar pattern is required"],
      trim: true,
    },
    chapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: [true, "Grammar must be linked to a chapter"],
    },
    meaning: {
      type: String,
      required: [true, "Pattern meaning is required"],
      trim: true,
    },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level",
      required: [true, "Grammar must be linked to a level"],
    },
    relatedKanji: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Kanji",
      },
    ],
    relatedVocab: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vocabulary",
      },
    ],
    notes: {
      type: [String],
      default: [],
    },
    examples: [
      {
        structure: {
          type: String,
        },
        meaning: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Grammar = mongoose.model("Grammar", grammarSchema);

export default Grammar;
