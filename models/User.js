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

    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },

    avatarId: { type: Number, default: 1 },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      index: true,
    },

    isActive: { type: Boolean, default: true },

    isEmailVerified: { type: Boolean, default: true }, 

    lastLogin: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
