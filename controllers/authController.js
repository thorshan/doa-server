import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_WEB_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Token is required" });

    const ticket = await client.verifyIdToken({
      idToken: token,
      // Verify against all platforms
      audience: [
        process.env.GOOGLE_WEB_CLIENT_ID,
        process.env.GOOGLE_ANDROID_CLIENT_ID,
      ],
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture, email_verified } = payload;

    // "Upsert" logic: Find by Google ID, or create new
    let user = await User.findOneAndUpdate(
      { googleId },
      { 
        $set: { 
          name, 
          email, 
          picture, 
          isEmailVerified: email_verified,
          lastLogin: new Date() 
        } 
      },
      { new: true, upsert: true }
    );

    // Generate YOUR backend JWT
    const backendToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token: backendToken, user });
  } catch (err) {
    console.error("Auth Error:", err.message);
    res.status(401).json({ message: "Invalid Google token" });
  }
};