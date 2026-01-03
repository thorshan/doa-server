import express from "express";
import {
  getAllExams,
  getExam,
  createExam,
  updateExam,
  deleteExam,
  getExamByLecture,
} from "../controllers/examController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createExam);
router.get("/", authMiddleware, getAllExams);
router.get("/:id", authMiddleware, getExam);
router.get("/lectures/:id", authMiddleware, getExamByLecture);
router.put("/:id", authMiddleware, updateExam);
router.delete("/:id", authMiddleware, deleteExam);

export default router;
