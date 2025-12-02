import {
  savedImage,
  getImage,
  clearImage,
} from "../controllers/imageController.js";
import express from "express";
import { upload } from "../middleware/multer.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

// CRUDs
router.post("/", upload.single("image"), savedImage);
router.get("/:id", authMiddleware, getImage);
router.delete("/:id", authMiddleware, clearImage);

export default router;
