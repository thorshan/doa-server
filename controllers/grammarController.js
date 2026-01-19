import Grammar from "../models/Grammar.js";

// CREATE
export const createGrammar = async (req, res) => {
  try {
    const grammar = await Grammar.create(req.body);
    res.status(201).json({ success: true, data: grammar });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// READ (BY ID)
export const getGrammarById = async (req, res) => {
  try {
    const grammar = await Grammar.findById(req.params.id)
      .populate("level", "code")
      .populate("relatedKanji")
      .populate("chapter")
      .populate("relatedVocab");

    if (!grammar) {
      return res.status(404).json({
        success: false,
        message: "Grammar point not found",
      });
    }

    res.status(200).json({
      success: true,
      data: grammar,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid ID format" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// READ (All/Filter)
export const getGrammars = async (req, res) => {
  try {
    const { levelId } = req.query;
    const filter = levelId ? { level: levelId } : {};

    const grammars = await Grammar.find(filter)
      .populate("level", "code")
      .populate("relatedKanji")
      .populate("relatedVocab")
      .populate("chapter")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: grammars.length,
      data: grammars,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
export const updateGrammar = async (req, res) => {
  try {
    const grammar = await Grammar.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!grammar)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: grammar });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE
export const deleteGrammar = async (req, res) => {
  try {
    const grammar = await Grammar.findByIdAndDelete(req.params.id);
    if (!grammar)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
