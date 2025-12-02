import Image from "../models/Image.js";

export const savedImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const webFriendlyPath = `/uploads/${req.file.filename}`;

    const newImage = new Image({
      fileName: req.file.filename,
      filePath: webFriendlyPath,

      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
    });

    const savedImage = await newImage.save();

    res.status(201).json({
      message: "Image uploaded successfully.",
      savedImage,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Image upload failed." });
  }
};

export const getImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findById(id);
    if (!image) return res.json({ message: "Image not found" });
  } catch (err) {
    console.error("Error getting image :", err);
    res.status(500).json({ error: "Error getting image." });
  }
};

export const clearImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findById(id);
    if (!image) return res.json({ message: "Image not found" });
    await Image.findByIdAndDelete(image._id);
  } catch (err) {
    console.error("Error getting image :", err);
    res.status(500).json({ error: "Error getting image." });
  }
};
