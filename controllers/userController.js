import User from "../models/User.js";
import {sendEmail} from "../utils/sendEmail.js";

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
    const { name, username, image } = req.body;

    const updateData = {};

    if (name) updateData.name = name;
    if (username) updateData.username = username;
    if (image) updateData.image = image;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No data provided to update" });
    }

    const user = await User.findByIdAndUpdate(id, { $set: updateData });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

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

    const levels = ["Basic", "N5", "N4", "N3", "N2", "N1", "Business"];
    const currentIndex = levels.indexOf(level) + 1;
    const current = levels[currentIndex];

    const user = await User.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          "level.passed": level,
        },
        $set: {
          "level.current": current,
        },
      },
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

/**
 * @description Update status (BASIC - PASSED)
 * @route PUT /api/users/id/basic-passed
 * @param id - User ID
 */
export const updateBasicLevel = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.id !== id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: { isBasicPassed: true },
      },
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

// ---------- SEND OTP ---------- //
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isEmailVerified)
      return res.status(400).json({ message: "User already verified" });

    const otp = user.createEmailOTP();
    await user.save({ validateBeforeSave: false });

    try {
      await sendEmail({
        to: user.email,
        subject: "Your Email Verification OTP",
        html: `<h3>Email Verification</h3><p>Your OTP is: <b>${otp}</b></p>`,
      });
    } catch (err) {
      console.error("Email sending failed:", err.message);
    }
    res.json({
      success: true,
      message: "OTP sent to your email)",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------- VERIFY OTP ---------- //
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({
      email,
      emailVerifyOTP: otp,
      emailVerifyExpire: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    user.isEmailVerified = true;
    user.emailVerifyOTP = undefined;
    user.emailVerifyExpire = undefined;
    await user.save();

    res.json({ success: true, message: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
