import RenshuuB from "../models/RenshuuB.js";

// @desc    Create Renshuu B entry
// @route   POST /api/renshuuB
export const createRenshuuB = async (req, res) => {
  try {
    const newRenshuuB = await RenshuuB.create(req.body);
    res.status(201).json({
      success: true,
      data: newRenshuuB,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all Renshuu B (Filter by Chapter or Level)
// @route   GET /api/renshuuB
export const getRenshuuB = async (req, res) => {
  try {
    const { chapterId, levelId } = req.query;
    const filter = {};
    if (chapterId) filter.chapter = chapterId;
    if (levelId) filter.level = levelId;

    const data = await RenshuuB.find(filter)
      .populate("chapter")
      .populate("level")
      .populate("relatedKanji")
      .populate("relatedVocab")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single Renshuu B by ID
// @route   GET /api/renshuuB/:id
export const getRenshuuBById = async (req, res) => {
  try {
    const item = await RenshuuB.findById(req.params.id)
      .populate("chapter")
      .populate("level")
      .populate("relatedKanji")
      .populate("relatedVocab");

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Renshuu B not found" });
    }

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update Renshuu B
// @route   PATCH /api/renshuuB/:id
export const updateRenshuuB = async (req, res) => {
  try {
    const updatedItem = await RenshuuB.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res
        .status(404)
        .json({ success: false, message: "Renshuu B not found" });
    }

    res.status(200).json({ success: true, data: updatedItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete Renshuu B
// @route   DELETE /api/renshuuB/:id
export const deleteRenshuuB = async (req, res) => {
  try {
    const item = await RenshuuB.findByIdAndDelete(req.params.id);

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Renshuu B not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Exercise deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
