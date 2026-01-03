import express from "express";
import {
  getAllKanji,
  getKanjiById,
  createKanji,
  updateKanji,
  deleteKanji,
} from "../controllers/kanjiController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllKanji);
router.get("/:id", authMiddleware, getKanjiById);
router.post("/", authMiddleware, createKanji);
router.put("/:id", authMiddleware, updateKanji);
router.delete("/:id", authMiddleware, deleteKanji);

export default router;
