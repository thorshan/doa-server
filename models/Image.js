import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
    unique: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
  },
  mimeType: {
    type: String,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("Image", ImageSchema);
