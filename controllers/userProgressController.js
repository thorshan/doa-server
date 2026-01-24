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
      return res.status(200).json({ success: true, data: { completedChapter: [] } });
    }

    res.status(200).json({ success: true, data: progress.courseProgress[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a specific module (grammar, renshuuA, etc.)
// @route   PATCH /api/progress/update-module
export const updateModuleProgress = async (req, res) => {
  const { levelTag, chapterId, moduleKey } = req.body;
  const userId = req.user._id;

  try {
    // UPSERT LOGIC: Ensure the level and chapter objects exist before updating the module
    await UserProgress.updateOne(
      { user: userId },
      { $addToSet: { courseProgress: { levelTag, completedChapter: [] } } }
    );

    await UserProgress.updateOne(
      { user: userId, "courseProgress.levelTag": levelTag },
      { $addToSet: { "courseProgress.$.completedChapter": { chapterId, completedSection: {} } } }
    );

    // Now perform the actual boolean update
    const fieldToUpdate = `courseProgress.$[course].completedChapter.$[chapter].completedSection.${moduleKey}`;
    const updated = await UserProgress.findOneAndUpdate(
      { user: userId },
      { $set: { [fieldToUpdate]: true } },
      {
        arrayFilters: [{ "course.levelTag": levelTag }, { "chapter.chapterId": chapterId }],
        new: true
      }
    );

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
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
          "courseProgress.$[course].completedChapter.$[chapter].score": score
        } 
      },
      {
        arrayFilters: [{ "course.levelTag": levelTag }, { "chapter.chapterId": chapterId }],
        new: true
      }
    );

    // Check if Course is fully complete (to unlock Final Exam)
    const currentCourse = progress.courseProgress.find(c => c.levelTag === levelTag);
    const allChaptersDone = currentCourse.completedChapter.every(ch => ch.isSectionCompleted);

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