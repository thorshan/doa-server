import { register, login, logout } from "../controllers/authController.js";
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", authMiddleware, logout);

export default router;
