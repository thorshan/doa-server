import express from "express";
import { 
  submitTest, 
  getUserStats, 
  getChapterProgress 
} from "../controllers/userProgressController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Submit a test (Chapter or Level)
router.post("/submit-test", authMiddleware, submitTest);

// Get global stats for the dashboard
router.get("/stats", authMiddleware, getUserStats);

// Get specific progress for a chapter (to show checkmarks)
router.get("/chapter/:id", authMiddleware, getChapterProgress);

export default router;