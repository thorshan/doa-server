import express from "express";
import {
  getAllCards,
  createCard,
  getCard,
  updateCard,
  deleteCard,
} from "../controllers/cardController.js";
import { authMiddleware } from "../middleware/authMiddleware.js"
const router = express.Router();

router.get("/cards", getAllCards);
router.post("/cards", authMiddleware, createCard);
router.get("/cards/:id", authMiddleware, getCard);
router.put("/cards/:id", authMiddleware, updateCard);
router.delete("/cards/:id", authMiddleware, deleteCard);

export default router;
