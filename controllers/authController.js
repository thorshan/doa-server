import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import TokenBlacklist from "../models/TokenBlacklist.js";

/**
 * @description Generate Token Func
 * @returns token
 */
const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

/**
 * @description Register Function
 * @route POST api/register
 */
export const register = async (req, res) => {
  try {
    const { name, email, username, password, level } = req.body;
    const existing = await User.findOne({ email });
    if (existing) res.status(402).json({ message: "User Already Exist." });
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      username,
      level,
      password: hashPassword,
    });
    const token = createToken(user._id);
    res.json({
      message: "User registered",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Register failed", error });
  }
};

/**
 * @description Login Function
 * @route POST api/login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate("image");
    if (!user) return res.status(401).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid Credientials" });
    const token = createToken(user._id);
    return res.json({
      message: "Login Success",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Login failed", error });
  }
};

/**
 * @description Logout Function
 * @route POST api/logout
 */
export const logout = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ message: "Invalid Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.decode(token);

    if (new Date(decoded.exp * 1000) < new Date()) {
      return res.json({
        message: "Logout successfully (token already expired)",
      });
    }

    const expiredAt = new Date(decoded.exp * 1000);
    await TokenBlacklist.create({ token, expiredAt });

    res.json({ message: "Logout successfully, token invalidated" });
  } catch (err) {
    res.status(500).json({ message: "Logout failed", error: err.message });
  }
};
