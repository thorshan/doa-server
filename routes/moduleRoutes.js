import express from "express";
import {
  getAllModules,
  getModuleById,
  createModule,
  updateModule,
  deleteModule,
} from "../controllers/moduleController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllModules);
router.get("/:id", authMiddleware, getModuleById);
router.post("/", authMiddleware, createModule);
router.put("/:id", authMiddleware, updateModule);
router.delete("/:id", authMiddleware, deleteModule);

export default router;
