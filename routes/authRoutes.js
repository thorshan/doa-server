import express from "express";
import { googleLogin, logout } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Google login / register (one endpoint)
router.post("/google", googleLogin);

// Logout (JWT + optional blacklist)
router.post("/logout", authMiddleware, logout);

export default router;
