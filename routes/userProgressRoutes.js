import express from "express";
import { updateModuleProgress, completeChapterTest, getCourseProgress } from "../controllers/userProgressController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/course/:levelTag", authMiddleware, getCourseProgress);
router.patch("/update-module", authMiddleware, updateModuleProgress);
router.post("/complete-chapter-test", authMiddleware, completeChapterTest);

export default router;