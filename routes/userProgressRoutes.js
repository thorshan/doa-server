import express from "express";
import {
  getUserProgress,
  markLecturePassed,
  getLatestProgress,
} from "../controllers/userProgressController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getUserProgress);
router.post("/pass", authMiddleware, markLecturePassed);
router.get("/latest", authMiddleware, getLatestProgress);

export default router;
