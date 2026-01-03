import express from "express";
import {
  getAllLevels,
  getLevelById,
  createLevel,
  updateLevel,
  deleteLevel,
} from "../controllers/levelController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllLevels);
router.get("/:id", authMiddleware, getLevelById);
router.post("/", authMiddleware, createLevel);
router.put("/:id", authMiddleware, updateLevel);
router.delete("/:id", authMiddleware, deleteLevel);

export default router;
