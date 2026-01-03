import express from "express";
import {
  getAllGrammar,
  getGrammarById,
  createGrammar,
  updateGrammar,
  deleteGrammar,
} from "../controllers/grammarController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllGrammar);
router.get("/:id", authMiddleware, getGrammarById);
router.post("/", authMiddleware, createGrammar);
router.put("/:id", authMiddleware, updateGrammar);
router.delete("/:id", authMiddleware, deleteGrammar);

export default router;
