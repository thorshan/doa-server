import MojiGoi from "../models/MojiGoi.js";

// READ
export const getAllMojiGoi = async (req, res) => {
  try {
    const vocab = await MojiGoi.find().populate("level").populate("module");
    res.json(vocab);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMojiGoiById = async (req, res) => {
  try {
    const { id } = req.params;
    const vocab = await MojiGoi.findById(id).populate("level").populate("module");
    if (!vocab) return res.status(404).json({ error: "Not found" });
    res.json(vocab);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE
export const createMojiGoi = async (req, res) => {
  try {
    const newVocab = new MojiGoi(req.body);
    await newVocab.save();
    res.status(201).json(newVocab);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE
export const updateMojiGoi = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await MojiGoi.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
export const deleteMojiGoi = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await MojiGoi.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
