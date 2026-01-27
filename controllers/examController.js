import Exam from "../models/Exam.js";

// CREATE
export const createExam = async (req, res) => {
  try {
    const exam = await Exam.create(req.body);
    res.status(201).json({ success: true, data: exam });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET ALL
export const getExams = async (req, res) => {
  try {
    const { levelId, examType } = req.query;
    const filter = {};
    if (levelId) filter.level = levelId;
    if (examType) filter.examType = examType;

    const data = await Exam.find(filter)
      .populate("level", "code")
      .populate("questions")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
export const getExamById = async (req, res) => {
  try {
    const item = await Exam.findById(req.params.id)
      .populate("level")
      .populate("questions");
    if (!item) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
export const updateExam = async (req, res) => {
  try {
    const item = await Exam.findByIdAndUpdate(req.params.id, req.body, {
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
export const deleteExam = async (req, res) => {
  try {
    const item = await Exam.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};