import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture || "", // Use picture from Google payload
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// Google login
export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body; // token string from client
    if (!token) return res.status(400).json({ message: "Token is required" });

    // Verify token (must use idToken field)
    const ticket = await client.verifyIdToken({
      idToken: token, // <-- FIXED
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // Check if user exists
    let user = await User.findOne({ googleId: payload.sub });
    if (!user) {
      user = new User({
        name: payload.name,
        email: payload.email,
        googleId: payload.sub,
        isEmailVerified: payload.email_verified,
        avatarId: 1,
        picture: payload.picture,
      });
      await user.save();
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const jwtToken = generateToken(user);
    res.json({ token: jwtToken, user });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Google login failed", error: err.message });
  }
};

// Logout (purely client-side)
export const logout = async (req, res) => {
  res.json({ message: "Logged out successfully" });
};
