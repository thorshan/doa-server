import express from "express";
import {
  getAllSpeaking,
  getSpeakingById,
  createSpeaking,
  updateSpeaking,
  deleteSpeaking,
} from "../controllers/speakingController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllSpeaking);
router.get("/:id", authMiddleware, getSpeakingById);
router.post("/", authMiddleware, createSpeaking);
router.put("/:id", authMiddleware, updateSpeaking);
router.delete("/:id", authMiddleware, deleteSpeaking);

export default router;
