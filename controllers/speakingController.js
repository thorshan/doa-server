import Speaking from "../models/Speaking.js";

/* ================= CREATE ================= */
export const createSpeaking = async (req, res) => {
  try {
    const speaking = await Speaking.create(req.body);
    res.status(201).json(speaking);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create Kaiwa",
      error: error.message,
    });
  }
};

/* ================= READ (LIST) ================= */
export const getSpeakings = async (req, res) => {
  try {
    const { level } = req.query;

    const filter = level ? { level } : {};

    const speakings = await Speaking.find(filter)
      .select("title description level createdAt")
      .sort({ createdAt: -1 });

    res.json(speakings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch Kaiwa list",
      error: error.message,
    });
  }
};

/* ================= READ (SINGLE) ================= */
export const getSpeakingById = async (req, res) => {
  try {
    const speaking = await Speaking.findById(req.params.id)
      .populate("level")
      .populate("relatedKanji")
      .populate("relatedVocabulary");

    if (!speaking) {
      return res.status(404).json({ message: "Kaiwa not found" });
    }

    res.json(speaking);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch Kaiwa",
      error: error.message,
    });
  }
};

/* ================= UPDATE ================= */
export const updateSpeaking = async (req, res) => {
  try {
    const speaking = await Speaking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!speaking) {
      return res.status(404).json({ message: "Kaiwa not found" });
    }

    res.json(speaking);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update Kaiwa",
      error: error.message,
    });
  }
};

/* ================= DELETE ================= */
export const deleteSpeaking = async (req, res) => {
  try {
    const speaking = await Speaking.findByIdAndDelete(req.params.id);

    if (!speaking) {
      return res.status(404).json({ message: "Kaiwa not found" });
    }

    res.json({ message: "Kaiwa deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete Kaiwa",
      error: error.message,
    });
  }
};
