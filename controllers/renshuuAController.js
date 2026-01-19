import RenshuuA from "../models/RenshuuA.js";

// CREATE
export const createRenshuuA = async (req, res) => {
  try {
    const renshuuA = await RenshuuA.create(req.body);
    res.status(201).json({ success: true, data: renshuuA });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET ALL (Filter by Chapter)
export const getRenshuuA = async (req, res) => {
  try {
    const { chapterId } = req.query;
    const filter = chapterId ? { chapter: chapterId } : {};

    const data = await RenshuuA.find(filter)
      .populate("chapter")
      .populate("level")
      .populate("relatedKanji")
      .populate("relatedVocab")
      .sort({ createdAt: 1 });

    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
export const getRenshuuAById = async (req, res) => {
  try {
    const item = await RenshuuA.findById(req.params.id)
      .populate("chapter")
      .populate("level")
      .populate("relatedKanji")
      .populate("relatedVocab");

    if (!item)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
export const updateRenshuuA = async (req, res) => {
  try {
    const item = await RenshuuA.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE
export const deleteRenshuuA = async (req, res) => {
  try {
    const item = await RenshuuA.findByIdAndDelete(req.params.id);
    if (!item)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
