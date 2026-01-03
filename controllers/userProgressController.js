import UserProgress from "../models/userProgress.js";

/**
 * GET user progress for all lectures
 * Used to lock/unlock chapters
 */
export const getUserProgress = async (req, res) => {
  try {
    const userId = req.user.id;

    const progress = await UserProgress.find({ user: userId }).select(
      "lecture testPassed score passedAt"
    );

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user progress" });
  }
};

/**
 * Mark lecture test as passed
 * Call AFTER user finishes test
 */
export const markLecturePassed = async (req, res) => {
  try {
    const userId = req.user.id;
    const { lecture, score } = req.body;

    if (!lecture) {
      return res.status(400).json({ message: "Lecture is required" });
    }

    const progress = await UserProgress.findOneAndUpdate(
      { user: userId, lecture },
      {
        testPassed: true,
        score,
        passedAt: new Date(),
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.json({
      message: "Lecture test marked as passed",
      progress,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update progress" });
  }
};

/**
 * Get user latest progress
 */
export const getLatestProgress = async (req, res) => {
  try {
    const progress = await UserProgress.findOne({
      user: req.user.id,
      testPassed: true,
    })
      .sort({ passedAt: -1 })
      .populate("lecture");

    if (!progress) {
      return res.json(null);
    }

    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch progress" });
  }
};

