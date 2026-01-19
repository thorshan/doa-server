import Speaking from "../models/Speaking.js";

// @desc    Get all speaking entries
export const getAllSpeaking = async (req, res) => {
  try {
    const speakings = await Speaking.find()
      .populate("level", "code")
      .populate("chapter", "index")
      .populate("relatedKanji")
      .populate("relatedGrammar")
      .populate("relatedVocabulary")
      .sort({ chapter: 1 });
    res.status(200).json(speakings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single speaking entry by ID with full details
export const getSpeakingById = async (req, res) => {
  try {
    const speaking = await Speaking.findById(req.params.id)
      .populate("level")
      .populate("chapter")
      .populate("relatedKanji")
      .populate("relatedGrammar")
      .populate("relatedVocabulary");

    if (!speaking) return res.status(404).json({ message: "Not Found" });
    res.status(200).json(speaking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new speaking entry
export const createSpeaking = async (req, res) => {
  try {
    const newSpeaking = new Speaking(req.body);
    const savedSpeaking = await newSpeaking.save();
    res.status(201).json(savedSpeaking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a speaking entry
export const updateSpeaking = async (req, res) => {
  try {
    const updatedSpeaking = await Speaking.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedSpeaking) return res.status(404).json({ message: "Not Found" });
    res.status(200).json(updatedSpeaking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a speaking entry
export const deleteSpeaking = async (req, res) => {
  try {
    const deleted = await Speaking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not Found" });
    res.status(200).json({ message: "Speaking entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
