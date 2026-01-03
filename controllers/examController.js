import Exam from "../models/Exam.js";
import Question from "../models/Question.js";

/* ================= CREATE EXAM ================= */
export const createExam = async (req, res) => {
  try {
    const exam = await Exam.create(req.body);
    res.status(201).json(exam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* ================= GET ALL EXAMS ================= */
export const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find()
      .populate("level module")
      .sort({ createdAt: 1 });

    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET SINGLE EXAM ================= */
export const getExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id)
      .populate("questions")
      .populate("level module");

    if (!exam) return res.status(404).json({ message: "Exam not found" });

    res.json(exam);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET SINGLE EXAM ================= */
export const getExamByLecture = async (req, res) => {
  try {
    const exam = await Exam.findOne({ lesson: req.params.id})
      .populate("questions")
      .populate("level module");

    if (!exam) return res.status(404).json({ message: "Exam not found" });

    res.json(exam);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= UPDATE EXAM ================= */
export const updateExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(exam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* ================= DELETE EXAM ================= */
export const deleteExam = async (req, res) => {
  try {
    await Question.deleteMany({ exam: req.params.id });
    await Exam.findByIdAndDelete(req.params.id);

    res.json({ message: "Exam deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
