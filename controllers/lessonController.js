import Lesson from "../models/Lesson.js";

export const getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find()
      .populate("level")
      .populate("module")
      .populate("grammarPatterns")
      .populate("kanji")
      .populate("vocabulary");
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id)
      .populate("level")
      .populate("module")
      .populate("grammarPatterns")
      .populate("kanji")
      .populate("vocabulary");
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createLesson = async (req, res) => {
  try {
    const lesson = await Lesson.create(req.body);
    res.status(201).json(lesson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });
    res.json(lesson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
