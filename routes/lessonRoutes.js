import express from "express";
import {
  getAllLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
} from "../controllers/lessonController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllLessons);
router.get("/:id", authMiddleware, getLessonById);
router.post("/", authMiddleware, createLesson);
router.put("/:id", authMiddleware, updateLesson);
router.delete("/:id", authMiddleware, deleteLesson);

export default router;
