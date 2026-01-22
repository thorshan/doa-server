import UserProgress from "../models/userProgress.js";
import User from "../models/User.js";
import mongoose from "mongoose";

/**
 * @desc    Get comprehensive stats for the User Profile/Dashboard
 * @route   GET /api/progress/stats
 */
export const getUserStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const stats = await UserProgress.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          totalChaptersAttempted: { $sum: 1 },
          chaptersPassed: { $sum: { $cond: ["$testPassed", 1, 0] } },
          averageScore: { $avg: "$score" },
          totalPoints: { $sum: "$score" },
          // Count how many modules are completed across all chapters
          grammarDone: { $sum: { $cond: ["$completedModules.grammar", 1, 0] } },
          speakingDone: { $sum: { $cond: ["$completedModules.speaking", 1, 0] } },
        }
      }
    ]);

    // Get recent activity (last 5 chapters touched)
    const recentActivity = await UserProgress.find({ user: userId })
      .sort({ lastAccessedAt: -1 })
      .limit(5)
      .populate("chapter", "title index");

    res.status(200).json({
      success: true,
      data: {
        summary: stats[0] || { chaptersPassed: 0, averageScore: 0, totalPoints: 0 },
        recentActivity,
        currentLevel: req.user.currentLevel
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get progress for a specific chapter (for ChapterDetails checkmarks)
 * @route   GET /api/progress/chapter/:id
 */
export const getChapterProgress = async (req, res) => {
  try {
    const progress = await UserProgress.findOne({
      user: req.user._id,
      chapter: req.params.id
    });

    res.status(200).json({
      success: true,
      data: progress || { 
        status: "not-started", 
        completedModules: { grammar: false, speaking: false, renshuuA: false, renshuuB: false, renshuuC: false } 
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Submit test results (Chapter or Level)
 */
export const submitTest = async (req, res) => {
  const { chapterId, score, totalQuestions, isLevelExam, levelTag } = req.body;
  const userId = req.user._id;

  try {
    const query = isLevelExam 
      ? { user: userId, levelTag: levelTag, isLevelExam: true }
      : { user: userId, chapter: chapterId, isLevelExam: false };

    let progress = await UserProgress.findOne(query);
    if (!progress) progress = new UserProgress(query);

    const isPassed = (score / totalQuestions) >= 0.7; // 70% pass mark

    // Update progress logic
    progress.attempts.push({ score, totalQuestions });
    if (score > progress.score) progress.score = score;
    
    if (isPassed) {
      progress.testPassed = true;
      progress.passedAt = Date.now();
      progress.status = "completed";
    }

    progress.lastAccessedAt = Date.now();
    await progress.save();

    // Level Upgrade Logic
    if (isLevelExam && isPassed) {
      const levelMap = { "N5": "N4", "N4": "N3", "N3": "N2", "N2": "N1" };
      await User.findByIdAndUpdate(userId, { currentLevel: levelMap[levelTag] });
    }

    res.status(200).json({ success: true, isPassed, score: progress.score });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};