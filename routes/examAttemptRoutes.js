import express from "express";
import { submitExam } from "../controllers/examAttemptController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:examId/submit", authMiddleware, submitExam);

export default router;
