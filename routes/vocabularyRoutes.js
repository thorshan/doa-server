import express from "express";
import {
  getAllVocabulary,
  getVocabularyById,
  createVocabulary,
  updateVocabulary,
  deleteVocabulary,
} from "../controllers/vocabularyController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllVocabulary);
router.get("/:id", authMiddleware, getVocabularyById);
router.post("/", authMiddleware, createVocabulary);
router.put("/:id", authMiddleware, updateVocabulary);
router.delete("/:id", authMiddleware, deleteVocabulary);

export default router;
