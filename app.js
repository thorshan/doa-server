import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import { connectDb } from "./config/database.js";

// Routes
import authRoute from "./routes/authRoutes.js";
import cardRoute from "./routes/cardRoutes.js";
import userRoute from "./routes/userRoutes.js";
import levelRoutes from "./routes/levelRoutes.js";
import moduleRoutes from "./routes/moduleRoutes.js";
import kanjiRoutes from "./routes/kanjiRoutes.js";
import grammarRoutes from "./routes/grammarRoutes.js";
import listeningRoutes from "./routes/listeningRoutes.js";
import readingRoutes from "./routes/readingRoutes.js";
import speakingRoutes from "./routes/speakingRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import examAttemptRoutes from "./routes/examAttemptRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import vocabularyRoutes from "./routes/vocabularyRoutes.js";
import userProgressRoutes from "./routes/userProgressRoutes.js";
import chapterRoutes from "./routes/chapterRoutes.js";
import renshuuARoutes from "./routes/renshuuARoutes.js";
import renshuuBRoutes from "./routes/renshuuBRoutes.js";
import renshuuCRoutes from "./routes/renshuuCRoutes.js";

// Connect Database
connectDb();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/auth", authRoute);
app.use("/api", cardRoute);
app.use("/api/users", userRoute);
app.use("/api/levels", levelRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/kanji", kanjiRoutes);
app.use("/api/vocabularies", vocabularyRoutes);
app.use("/api/readings", readingRoutes);
app.use("/api/listenings", listeningRoutes);
app.use("/api/speakings", speakingRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/exams/attempt", examAttemptRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/grammars", grammarRoutes);
app.use("/api/progress", userProgressRoutes);
app.use("/api/chapters", chapterRoutes);
app.use("/api/renshuuA", renshuuARoutes);
app.use("/api/renshuuB", renshuuBRoutes);
app.use("/api/renshuuC", renshuuCRoutes);

export default app;
