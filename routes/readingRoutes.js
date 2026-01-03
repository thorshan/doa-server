import express from "express";
import {
  getAllReadings,
  getReadingById,
  createReading,
  updateReading,
  deleteReading,
} from "../controllers/readingController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllReadings);
router.get("/:id", authMiddleware, getReadingById);
router.post("/", authMiddleware, createReading);
router.put("/:id", authMiddleware, updateReading);
router.delete("/:id", authMiddleware, deleteReading);

export default router;
