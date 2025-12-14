import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const app = express();

// Upload Config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import authRoute from "./routes/authRoutes.js";
import imageRoute from "./routes/imageRoute.js";
import cardRoute from "./routes/cardRoutes.js";
import userRoute from "./routes/userRoutes.js";

import { connectDb } from "./config/database.js";
connectDb();

app.use(cors());
const uploadPath = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadPath));
app.use("/api/images", imageRoute);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api", cardRoute);
app.use("/api/users", userRoute);

export default app;
