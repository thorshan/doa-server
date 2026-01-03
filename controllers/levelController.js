import Level from "../models/Level.js";

export const getAllLevels = async (req, res) => {
  try {
    const levels = await Level.find();
    res.json(levels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLevelById = async (req, res) => {
  try {
    const level = await Level.findById(req.params.id);
    if (!level) return res.status(404).json({ error: "Level not found" });
    res.json(level);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createLevel = async (req, res) => {
  try {
    const newLevel = new Level(req.body);
    await newLevel.save();
    res.status(201).json(newLevel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateLevel = async (req, res) => {
  try {
    const updated = await Level.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Level not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteLevel = async (req, res) => {
  try {
    const deleted = await Level.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Level not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
