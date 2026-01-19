import Question from "../models/Question.js";

// CREATE
export const createQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json({ success: true, data: question });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET ALL (Filter by Level or Category)
export const getQuestions = async (req, res) => {
  try {
    const { levelId, category } = req.query;
    const filter = {};
    if (levelId) filter.level = levelId;
    if (category) filter.category = category;

    const data = await Question.find(filter)
      .populate("level", "code")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
export const getQuestionById = async (req, res) => {
  try {
    const item = await Question.findById(req.params.id).populate("level");
    if (!item) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
export const updateQuestion = async (req, res) => {
  try {
    const item = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE
export const deleteQuestion = async (req, res) => {
  try {
    const item = await Question.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};