import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization header missing or invalid." });
  }

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded)
    return res.status(401).json({ message: "Invalid or expired token" });

  const user = await User.findById(decoded.id);
  if (!user) return res.status(401).json({ message: "User not found" });

  req.user = user;
  next();
};
