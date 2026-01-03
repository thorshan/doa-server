import Vocabulary from "../models/Vocabulary.js";

export const getAllVocabulary = async (req, res) => {
  try {
    const vocab = await Vocabulary.find().populate("kanji").populate("level");
    res.json(vocab);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

export const getVocabularyById = async (req, res) => {
  try {
    const vocab = await Vocabulary.findById(req.params.id).populate("kanji");
    if (!vocab) return res.status(404).json({ error: "Vocabulary not found" });
    res.json(vocab);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

export const createVocabulary = async (req, res) => {
  try {
    const vocab = await Vocabulary.create(req.body);
    res.status(201).json(vocab);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

export const updateVocabulary = async (req, res) => {
  try {
    const vocab = await Vocabulary.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vocab) return res.status(404).json({ error: "Vocabulary not found" });
    res.json(vocab);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

export const deleteVocabulary = async (req, res) => {
  try {
    const vocab = await Vocabulary.findByIdAndDelete(req.params.id);
    if (!vocab) return res.status(404).json({ error: "Vocabulary not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
