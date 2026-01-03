import express from "express";
import {
  getAllQuestions,
  getQuestionsByExam,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "../controllers/questionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllQuestions);
router.post("/", authMiddleware, createQuestion);
router.get("/exam/:examId", authMiddleware, getQuestionsByExam);
router.put("/:id", authMiddleware, updateQuestion);
router.delete("/:id", authMiddleware, deleteQuestion);

export default router;
