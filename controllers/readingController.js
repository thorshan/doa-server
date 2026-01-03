import Reading from "../models/Reading.js";

export const getAllReadings = async (req, res) => {
  try {
    const items = await Reading.find().populate("level");
    res.json(items);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

export const getReadingById = async (req, res) => {
  try {
    const item = await Reading.findById(req.params.id).populate("level");
    if (!item) return res.status(404).json({ error: "Reading not found" });
    res.json(item);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

export const createReading = async (req, res) => {
  try {
    const item = await Reading.create(req.body);
    res.status(201).json(item);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

export const updateReading = async (req, res) => {
  try {
    const item = await Reading.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: "Reading not found" });
    res.json(item);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

export const deleteReading = async (req, res) => {
  try {
    const item = await Reading.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "Reading not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
