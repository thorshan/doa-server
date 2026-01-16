import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import TokenBlacklist from "../models/TokenBlacklist.js";

const client = new OAuth2Client(process.env.GOOGLE_WEB_CLIENT_ID);

/**
 * @description Generate JWT Token
 */
const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "7d",
  });

/**
 * @description Google Login / Register
 * @route POST /api/auth/google
 */
export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "No token provided" });

    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_WEB_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    // Find existing user
    let user = await User.findOne({ googleId: payload.sub }).populate("image");

    // Create new user if not found
    if (!user) {
      user = await User.create({
        name: payload.name,
        email: payload.email,
        googleId: payload.sub,
        lastLogin: new Date(),
      });
    } else {
      // Update last login
      user.lastLogin = new Date();
      await user.save();
    }

    // Generate JWT
    const jwtToken = createToken(user._id);

    res.json({
      message: "Login Success",
      user,
      token: jwtToken,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid Google token", error });
  }
};

/**
 * @description Logout Function (optional)
 * @route POST /api/auth/logout
 */
export const logout = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ message: "Invalid Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.decode(token);
    if (!decoded) return res.status(400).json({ message: "Invalid token" });

    const expiredAt = new Date(decoded.exp * 1000);
    await TokenBlacklist.create({ token, expiredAt });

    res.json({ message: "Logout successfully, token invalidated" });
  } catch (err) {
    res.status(500).json({ message: "Logout failed", error: err.message });
  }
};
