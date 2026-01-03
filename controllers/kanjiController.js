import Kanji from "../models/Kanji.js";

export const getAllKanji = async (req, res) => {
  try {
    const kanji = await Kanji.find().populate("level");
    res.json(kanji);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getKanjiById = async (req, res) => {
  try {
    const kanji = await Kanji.findById(req.params.id);
    if (!kanji) return res.status(404).json({ error: "Kanji not found" });
    res.json(kanji);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createKanji = async (req, res) => {
  try {
    const newKanji = new Kanji(req.body);
    await newKanji.save();
    res.status(201).json(newKanji);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateKanji = async (req, res) => {
  try {
    const updated = await Kanji.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Kanji not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteKanji = async (req, res) => {
  try {
    const deleted = await Kanji.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Kanji not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
