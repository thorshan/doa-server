import RenshuuC from '../models/RenshuuC.js';

// @desc    Create Renshuu C (Dialogue/Conversation)
// @route   POST /api/renshuuC
export const createRenshuuC = async (req, res) => {
  try {
    const renshuuC = await RenshuuC.create(req.body);
    res.status(201).json({
      success: true,
      data: renshuuC
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all Renshuu C (Filtered by Chapter/Level)
// @route   GET /api/renshuuC
export const getRenshuuC = async (req, res) => {
  try {
    const { chapterId, levelId } = req.query;
    const filter = {};
    if (chapterId) filter.chapter = chapterId;
    if (levelId) filter.level = levelId;

    const data = await RenshuuC.find(filter)
      .populate('level', 'code')
      .populate('chapter', 'index')
      .populate('relatedKanji') 
      .populate('relatedVocab')
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single Renshuu C entry
// @route   GET /api/renshuuC/:id
export const getRenshuuCById = async (req, res) => {
  try {
    const item = await RenshuuC.findById(req.params.id)
      .populate('level')
      .populate('chapter')
      .populate('relatedKanji')
      .populate('relatedVocab');

    if (!item) {
      return res.status(404).json({ success: false, message: "Renshuu C not found" });
    }

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update Renshuu C
// @route   PATCH /api/renshuuC/:id
export const updateRenshuuC = async (req, res) => {
  try {
    const updated = await RenshuuC.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Renshuu C not found" });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete Renshuu C
// @route   DELETE /api/renshuuC/:id
export const deleteRenshuuC = async (req, res) => {
  try {
    const item = await RenshuuC.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Renshuu C not found" });
    }
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};