import express from "express";
import { updateModuleProgress, completeChapterTest } from "../controllers/userProgressController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Update status for grammar, speaking, renshuuA, etc.
router.patch("/update-module", authMiddleware, updateModuleProgress);

// Finalize chapter after passing the test
router.post("/complete-chapter-test", authMiddleware, completeChapterTest);

export default router;