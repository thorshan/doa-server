import express from "express";
import {
  getAllSpeaking,
  getSpeakingById,
  createSpeaking,
  updateSpeaking,
  deleteSpeaking
} from "../controllers/speakingController.js";

const router = express.Router();

// Base path: /api/speaking
router.route("/")
  .get(getAllSpeaking)
  .post(createSpeaking);

router.route("/:id")
  .get(getSpeakingById)
  .put(updateSpeaking)
  .delete(deleteSpeaking);

export default router;