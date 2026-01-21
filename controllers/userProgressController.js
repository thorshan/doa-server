import UserProgress from "../models/userProgress.js";

/**
 * GET all progress records for the current user
 */
export const getUserProgress = async (req, res) => {
  try {
    const userId = req.user.id;

    const progress = await UserProgress.find({ user: userId })
      .populate("chapter", "title name") // Populating chapter info for the UI
      .select("chapter testPassed score passedAt");

    res.json({ success: true, data: progress });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch user progress" });
  }
};

/**
 * Save or Update Chapter Progress
 */
export const markChapterPassed = async (req, res) => {
  try {
    const userId = req.user.id;
    const { chapterId, score, testPassed } = req.body;

    if (!chapterId) {
      return res.status(400).json({ success: false, message: "Chapter ID is required" });
    }

    const progress = await UserProgress.findOneAndUpdate(
      { user: userId, chapter: chapterId },
      {
        testPassed: testPassed ?? true,
        score: score || 0,
        passedAt: testPassed ? new Date() : undefined,
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.json({
      success: true,
      message: "Progress updated successfully",
      data: progress,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update progress" });
  }
};

/**
 * Get User's Latest Progress (For "Continue" button)
 */
export const getLatestProgress = async (req, res) => {
  try {
    const userId = req.user.id; 

    const progress = await UserProgress.findOne({ user: userId })
      .sort({ updatedAt: -1 }) 
      .populate({
        path: "chapter",
        populate: { path: "module", select: "name" } 
      });

    if (!progress) {
      return res.json({ success: true, data: null });
    }

    res.json({ success: true, data: progress });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch latest progress" });
  }
};