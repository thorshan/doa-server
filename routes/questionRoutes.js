import express from "express";
import {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from "../controllers/questionController.js";

const router = express.Router();

// Path: /api/questions
router.route("/")
  .get(getQuestions)     
  .post(createQuestion); 

// Path: /api/questions/:id
router.route("/:id")
  .get(getQuestionById)
  .put(updateQuestion)
  .delete(deleteQuestion);

export default router;