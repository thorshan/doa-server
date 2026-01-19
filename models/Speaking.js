import mongoose from "mongoose";

const SpeakerSchema = new mongoose.Schema(
  {
    nameJa: { type: String, required: true }, // ミラーさん
    nameMm: { type: String }, // Mr. Miller
  },
  { _id: false }
);

const SpeakingLineSchema = new mongoose.Schema(
  {
    orderIndex: { type: Number, required: true },

    speaker: {
      type: SpeakerSchema,
      required: true,
    },

    textJa: { type: String, required: true },
    textMn: { type: String, required: true },

    audioUrl: { type: String },
  },
  { _id: false }
);

const speakingSchema = new mongoose.Schema(
  {
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level",
      required: true,
    },
    chapter:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },
    title: {
      type: String,
      required: true,
      default: "会話",
    },
    description: {
      type: String,
    },
    audioUrl: {
      type: String,
    },
    lines: {
      type: [SpeakingLineSchema],
      required: true,
      validate: {
        validator: (v) => v.length > 0,
        message: "Kaiwa must contain at least one line",
      },
    },
    relatedKanji: [{ type: mongoose.Schema.Types.ObjectId, ref: "Kanji" }],
    relatedGrammar: [{ type: mongoose.Schema.Types.ObjectId, ref: "Grammar" }],
    relatedVocabulary: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Vocabulary" },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Speaking", speakingSchema);
