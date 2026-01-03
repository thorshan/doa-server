import express from "express";
import {
  getAllListening,
  getListeningById,
  createListening,
  updateListening,
  deleteListening,
} from "../controllers/listeningController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllListening);
router.get("/:id", authMiddleware, getListeningById);
router.post("/", authMiddleware, createListening);
router.put("/:id", authMiddleware, updateListening);
router.delete("/:id", authMiddleware, deleteListening);

export default router;
