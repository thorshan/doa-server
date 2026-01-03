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
import levelRoutes from "./routes/levelRoutes.js";
import moduleRoutes from "./routes/moduleRoutes.js";
import kanjiRoutes from "./routes/kanjiRoutes.js";
import lessonRoutes from "./routes/lessonRoutes.js";
import grammarRoutes from "./routes/grammarRoutes.js";
import listeningRoutes from "./routes/listeningRoutes.js";
import readingRoutes from "./routes/readingRoutes.js";
import speakingRoutes from "./routes/speakingRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import examAttemptRoutes from "./routes/examAttemptRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import vocabularyRoutes from "./routes/vocabularyRoutes.js";
import userProgressRoutes from "./routes/userProgressRoutes.js";


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
app.use("/api/levels", levelRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/kanji", kanjiRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/vocabularies", vocabularyRoutes);
app.use("/api/readings", readingRoutes);
app.use("/api/listenings", listeningRoutes);
app.use("/api/speakings", speakingRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/exams/attempt", examAttemptRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/grammars", grammarRoutes);
app.use("/api/user-progress", userProgressRoutes);


export default app;
