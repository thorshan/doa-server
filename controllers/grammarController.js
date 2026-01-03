import Grammar from "../models/Grammar.js";

export const getAllGrammar = async (req, res) => {
  try {
    const grammar = await Grammar.find()
      .populate("level")
      .populate("relatedKanji")
      .populate("relatedVocabulary")
      .sort({ createdAt: 1 })
      .lean();
    res.json(grammar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getGrammarById = async (req, res) => {
  try {
    const { id } = req.params;
    const grammar = await Grammar.findById(id)
      .populate("level")
      .populate("relatedKanji")
      .populate("relatedVocabulary");
    if (!grammar) return res.status(404).json({ error: "Not found" });
    res.json(grammar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createGrammar = async (req, res) => {
  try {
    const newGrammar = new Grammar(req.body);
    await newGrammar.save();
    res.status(201).json(newGrammar);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateGrammar = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Grammar.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteGrammar = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Grammar.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
