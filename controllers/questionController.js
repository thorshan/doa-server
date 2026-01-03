import Question from "../models/Question.js";
import Exam from "../models/Exam.js";

/* ================= CREATE QUESTION ================= */
export const createQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);

    await Exam.findByIdAndUpdate(
      question.exam,
      { $push: { questions: question._id } }
    );

    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* ================= GET ALL QUESTIONS ================= */
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate("exam")
      .sort({ createdAt: 1 });

    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET QUESTIONS BY EXAM ================= */
export const getQuestionsByExam = async (req, res) => {
  try {
    const questions = await Question.find({ exam: req.params.examId })
      .sort({ createdAt: 1 });

    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= UPDATE QUESTION ================= */
export const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(question);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* ================= DELETE QUESTION ================= */
export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    await Exam.findByIdAndUpdate(
      question.exam,
      { $pull: { questions: question._id } }
    );

    await question.deleteOne();

    res.json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
