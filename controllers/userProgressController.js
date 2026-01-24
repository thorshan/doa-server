import UserProgress from "../models/userProgress.js";

// @desc    Update a specific module (grammar, renshuuA, etc.)
// @route   PATCH /api/progress/update-module
export const updateModuleProgress = async (req, res) => {
  const { levelTag, chapterId, moduleKey } = req.body; 
  const userId = req.user._id;

  try {
    const fieldToUpdate = `courseProgress.$[course].completedChapter.$[chapter].completedSection.${moduleKey}`;

    const updatedProgress = await UserProgress.findOneAndUpdate(
      { user: userId },
      { $set: { [fieldToUpdate]: true } },
      {
        arrayFilters: [
          { "course.levelTag": levelTag },
          { "chapter.chapterId": chapterId }
        ],
        new: true
      }
    );

    res.status(200).json({ success: true, data: updatedProgress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Complete Chapter Test and check for Course Completion
// @route   POST /api/progress/complete-chapter-test
export const completeChapterTest = async (req, res) => {
  const { levelTag, chapterId, score } = req.body;
  const userId = req.user._id;

  try {
    // 1. Mark the Chapter Section as Completed
    const progress = await UserProgress.findOneAndUpdate(
      { user: userId },
      { 
        $set: { 
          "courseProgress.$[course].completedChapter.$[chapter].isSectionCompleted": true,
          "courseProgress.$[course].completedChapter.$[chapter].score": score
        } 
      },
      {
        arrayFilters: [
          { "course.levelTag": levelTag },
          { "chapter.chapterId": chapterId }
        ],
        new: true
      }
    );

    // 2. Logical Check: Are ALL chapters in this course now completed?
    const currentCourse = progress.courseProgress.find(c => c.levelTag === levelTag);
    const allChaptersDone = currentCourse.completedChapter.every(ch => ch.isSectionCompleted);

    if (allChaptersDone) {
      await UserProgress.updateOne(
        { user: userId, "courseProgress.levelTag": levelTag },
        { $set: { "courseProgress.$.isCompletedChapter": true } }
      );
    }

    res.status(200).json({ 
      success: true, 
      allChaptersDone, 
      message: "Chapter finalized successfully." 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};