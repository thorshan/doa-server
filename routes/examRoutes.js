import express from "express";
import {
  createExam,
  getExams,
  getExamById,
  updateExam,
  deleteExam,
} from "../controllers/examController.js";

const router = express.Router();

// Path: /api/exams
router.route("/")
  .get(getExams)        
  .post(createExam);   
// Path: /api/exams/:id
router.route("/:id")
  .get(getExamById)     
  .put(updateExam)
  .delete(deleteExam);

export default router;