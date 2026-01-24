import UserProgress from "../models/userProgress.js";

// @desc    Get progress for a specific level
// @route   GET /api/progress/course/:levelTag
export const getCourseProgress = async (req, res) => {
  const { levelTag } = req.params;
  const userId = req.user._id;

  try {
    const progress = await UserProgress.findOne(
      { user: userId, "courseProgress.levelTag": levelTag },
      { "courseProgress.$": 1 }
    );

    if (!progress) {
      return res
        .status(200)
        .json({ success: true, data: { completedChapter: [] } });
    }

    res.status(200).json({ success: true, data: progress.courseProgress[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a specific module (grammar, renshuuA, etc.)
// @route   PATCH /api/progress/update-module
import mongoose from "mongoose";

export const updateModuleProgress = async (req, res) => {
  const { levelTag, chapterId, moduleKey } = req.body;
  const userId = req.user._id;

  try {
    const objChapterId = new mongoose.Types.ObjectId(chapterId);

    // 1. First, ensure the UserProgress document exists for this user
    // This creates the base doc if it doesn't exist, without using arrayFilters
    let progress = await UserProgress.findOne({ user: userId });
    if (!progress) {
      progress = await UserProgress.create({ 
        user: userId, 
        courseProgress: [] 
      });
    }

    // 2. Ensure the Level (e.g., N5) exists in the courseProgress array
    const levelExists = progress.courseProgress.find(cp => cp.levelTag === levelTag);
    if (!levelExists) {
      await UserProgress.updateOne(
        { user: userId },
        { $push: { courseProgress: { levelTag, completedChapter: [] } } }
      );
    }

    // 3. Ensure the Chapter exists inside that level
    const chapterPath = "courseProgress.completedChapter.chapterId";
    const chapterExists = await UserProgress.findOne({
      user: userId,
      "courseProgress.levelTag": levelTag,
      "courseProgress.completedChapter.chapterId": objChapterId
    });

    if (!chapterExists) {
      await UserProgress.updateOne(
        { user: userId, "courseProgress.levelTag": levelTag },
        { 
          $push: { 
            "courseProgress.$.completedChapter": { 
              chapterId: objChapterId, 
              completedSection: {
                grammar: false, speaking: false,
                renshuuA: false, renshuuB: false, renshuuC: false
              }
            } 
          } 
        }
      );
    }

    // 4. THE ACTUAL UPDATE
    // Since we verified the structure exists above, we DO NOT use { upsert: true }
    // This prevents the "Identifier not used" error during timestamp insertion
    const fieldToUpdate = `courseProgress.$[course].completedChapter.$[chapter].completedSection.${moduleKey}`;
    
    const updatedDoc = await UserProgress.findOneAndUpdate(
      { user: userId },
      { $set: { [fieldToUpdate]: true } },
      {
        arrayFilters: [
          { "course.levelTag": levelTag }, 
          { "chapter.chapterId": objChapterId }
        ],
        new: true,
        // WARNING: Ensure upsert is NOT true here
      }
    );

    res.status(200).json({ 
      success: true, 
      message: `${moduleKey} marked as complete`,
      data: updatedDoc 
    });

  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Complete Chapter Test
// @route   POST /api/progress/complete-chapter-test
export const completeChapterTest = async (req, res) => {
  const { levelTag, chapterId, score } = req.body;
  const userId = req.user._id;

  try {
    const progress = await UserProgress.findOneAndUpdate(
      { user: userId },
      {
        $set: {
          "courseProgress.$[course].completedChapter.$[chapter].isSectionCompleted": true,
          "courseProgress.$[course].completedChapter.$[chapter].score": score,
        },
      },
      {
        arrayFilters: [
          { "course.levelTag": levelTag },
          { "chapter.chapterId": chapterId },
        ],
        new: true,
      }
    );

    // Check if Course is fully complete (to unlock Final Exam)
    const currentCourse = progress.courseProgress.find(
      (c) => c.levelTag === levelTag
    );
    const allChaptersDone = currentCourse.completedChapter.every(
      (ch) => ch.isSectionCompleted
    );

    if (allChaptersDone) {
      await UserProgress.updateOne(
        { user: userId, "courseProgress.levelTag": levelTag },
        { $set: { "courseProgress.$.isCompletedChapter": true } }
      );
    }

    res.status(200).json({ success: true, allChaptersDone });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
