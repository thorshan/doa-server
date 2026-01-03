import mongoose from "mongoose";

const mojiGoiSchema = new mongoose.Schema(
  {
    level: { type: mongoose.Schema.Types.ObjectId, ref: "Level", required: true },
    module: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true },
    kanji: { type: String, required: true },
    reading: { type: String, required: true },
    meaning: { type: String, required: true },
    example: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("MojiGoi", mojiGoiSchema);
