import User from "../models/User.js";

/**
 * @description Get user profile by ID
 * @route GET /api/profile/:id
 * @param id - User ID
 */
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate("image");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * @description Get user data by ID
 * @route GET /api/user
 * @param id - User ID
 */
export const getUserData = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("image");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * @description Get user profile by ID
 * @route PUT /api/profile
 * @param id - User ID
 */
export const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const existing = await User.findById(id);
    if (!existing) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = await User.findByIdAndUpdate(id, updateData);
    res.json({ message: "User updated", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * @description Update user level
 * @route PUT /api/users/id/level
 * @param id - User ID
 */
export const updateUserLevel = async (req, res) => {
  try {
    const { id } = req.params;
    const { level } = req.body;

    if (req.user.id !== id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { level },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User level updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

