import express from "express";
import {
  getUserData,
  getUserProfile,
  updateUserProfile,
  updateUserLevel,
  sendOTP,
  verifyOTP,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/user", authMiddleware, getUserData);
router.get("/:id", authMiddleware, getUserProfile);
router.post("/send-otp", authMiddleware, sendOTP);
router.post("/verify-otp", authMiddleware, verifyOTP);
router.put("/update/:id", authMiddleware, updateUserProfile);
router.put("/:id/level", authMiddleware, updateUserLevel);

export default router;
