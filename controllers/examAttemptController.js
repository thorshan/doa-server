import Exam from "../models/Exam.js";
import Question from "../models/Question.js";
import ExamAttempt from "../models/ExamAttempt.js";

/* ================= SUBMIT EXAM ================= */
export const submitExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const { answers, timeSpent } = req.body;
    const userId = req.user._id;

    const exam = await Exam.findById(examId).populate("questions");
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    let score = 0;
    let totalMarks = 0;

    const evaluatedAnswers = exam.questions.map((q) => {
      totalMarks += q.marks;

      const userAnswer = answers.find(
        (a) => a.questionId === q._id.toString()
      );

      const isCorrect =
        JSON.stringify(userAnswer?.answer) ===
        JSON.stringify(q.correctAnswer);

      const marksObtained = isCorrect ? q.marks : 0;
      score += marksObtained;

      return {
        question: q._id,
        answer: userAnswer?.answer,
        isCorrect,
        marksObtained,
      };
    });

    const percentage = (score / totalMarks) * 100;
    const passed = percentage >= exam.passingScore;

    const attempt = await ExamAttempt.create({
      user: userId,
      exam: examId,
      answers: evaluatedAnswers,
      score,
      percentage,
      passed,
      timeSpent,
    });

    res.json(attempt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
