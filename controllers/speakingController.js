import Speaking from "../models/Speaking.js";

export const getAllSpeaking = async (req, res) => {
  try {
    const items = await Speaking.find().populate("level");
    res.json(items);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

export const getSpeakingById = async (req, res) => {
  try {
    const item = await Speaking.findById(req.params.id).populate("level");
    if (!item) return res.status(404).json({ error: "Speaking not found" });
    res.json(item);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

export const createSpeaking = async (req, res) => {
  try {
    const item = await Speaking.create(req.body);
    res.status(201).json(item);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

export const updateSpeaking = async (req, res) => {
  try {
    const item = await Speaking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: "Speaking not found" });
    res.json(item);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

export const deleteSpeaking = async (req, res) => {
  try {
    const item = await Speaking.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "Speaking not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
