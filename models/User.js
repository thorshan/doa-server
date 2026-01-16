import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    // Google unique ID (from idToken.sub)
    googleId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    picture: {
      type: String,
      trim: true,
    },

    avatarId: { type: Number, default: 1 },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      index: true,
    },

    level: {
      passed: {
        type: [String],
        default: [],
      },
      current: {
        type: String,
      },
    },

    isActive: { type: Boolean, default: true },

    isEmailVerified: { type: Boolean, default: true },

    lastLogin: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
