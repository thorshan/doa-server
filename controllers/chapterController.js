import Chapter from "../models/Chapter.js";

// @desc    Create a new chapter
// @route   POST /api/chapters
export const createChapter = async (req, res) => {
  try {
    const { index, level } = req.body;

    const newChapter = await Chapter.create({ index, level });

    res.status(201).json({
      success: true,
      data: newChapter,
    });
  } catch (error) {
    // Handle Duplicate Index Error (Mongo Error Code 11000)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: `Chapter with index ${req.body.index} already exists in this level.`,
      });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all chapters (with level filter & pagination)
// @route   GET /api/chapters
export const getChapters = async (req, res) => {
  try {
    const { levelId, page = 1, limit = 10 } = req.query;
    const filter = levelId ? { level: levelId } : {};

    const chapters = await Chapter.find(filter)
      .populate("level", "code")
      .populate("grammars")
      .populate("renshuuA")
      .populate("renshuuB")
      .populate("speaking")
      .sort({ index: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Chapter.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: chapters.length,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      },
      data: chapters,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Chapter with FULL objects for all nested children
// @route   GET /api/chapters/:id
export const getFullChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id)
      .populate("level")
      .populate({
        path: "grammars",
        populate: [{ path: "relatedKanji" }, { path: "relatedVocab" }],
      })
      .populate({
        path: "renshuuA",
        populate: [{ path: "relatedKanji" }, { path: "relatedVocab" }],
      })
      .populate({
        path: "renshuuB",
        populate: [{ path: "relatedKanji" }, { path: "relatedVocab" }],
      })
      .populate({
        path: "renshuuC",
        populate: [{ path: "relatedKanji" }, { path: "relatedVocab" }],
      })
      .populate({
        path: "speaking",
        populate: [
          { path: "relatedKanji" },
          { path: "relatedVocab" },
          { path: "relatedGrammar" },
        ],
      });

    if (!chapter) {
      return res.status(404).json({
        success: false,
        message: "Chapter not found",
      });
    }

    res.status(200).json({
      success: true,
      data: chapter,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update chapter
// @route   PATCH /api/chapters/:id
export const updateChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!chapter) {
      return res
        .status(404)
        .json({ success: false, message: "Chapter not found" });
    }

    res.status(200).json({ success: true, data: chapter });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete chapter
// @route   DELETE /api/chapters/:id
export const deleteChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findByIdAndDelete(req.params.id);

    if (!chapter) {
      return res
        .status(404)
        .json({ success: false, message: "Chapter not found" });
    }

    res.status(200).json({ success: true, message: "Chapter deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
