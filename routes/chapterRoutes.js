import express from "express";
import {
  createChapter,
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

// ID route: /api/chapters/:id
router
  .route("/:id")
  .get(getFullChapter)
  .patch(updateChapter)
  .delete(deleteChapter);

export default router;
