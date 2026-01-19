import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema(
  {
    index: {
      type: Number,
      required: [true, "Chapter index is required"],
    },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level",
      required: [true, "A chapter must belong to a level"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

chapterSchema.virtual("grammars", {
  ref: "Grammar",
  localField: "_id",
  foreignField: "chapter",
});

chapterSchema.virtual("renshuuA", {
  ref: "RenshuuA",
  localField: "_id",
  foreignField: "chapter",
});

chapterSchema.virtual("renshuuB", {
  ref: "RenshuuB",
  localField: "_id",
  foreignField: "chapter",
});

chapterSchema.virtual("renshuuC", {
  ref: "RenshuuC",
  localField: "_id",
  foreignField: "chapter",
});

const Chapter = mongoose.model("Chapter", chapterSchema);

export default Chapter;
