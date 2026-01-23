import express from "express";
import {
  createChapter,
  getAllChapters,
  getChapters,
  getFullChapter,
  updateChapter,
  deleteChapter,
} from "../controllers/chapterController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// Base route: /api/chapters
router.route("/").post(createChapter).get(getChapters);
router.get("/admin", getAllChapters);

// ID route: /api/chapters/:id
router
  .route("/:id")
  .get(getFullChapter)
  .patch(updateChapter)
  .delete(deleteChapter);

export default router;
