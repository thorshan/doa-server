import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
      minlength: 4,
      maxlength: 20,
      trim: true,
      requried: true,
      lowercase: true,
      match: /^[a-zA-Z0-9_]+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
    level: {
      type: String,
      enum: ["Basic", "N5", "N4", "N3", "N2", "N1", "Business Japanese"],
      default: null,
    },
    status: {
      type: String,
      enum: ["Learning", "Passed"],
      default: "Learning",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const RESERVED_USERNAMES = ["admin", "superadmin", "user", "superuser"];

UserSchema.path("username").validate((value) => {
  return !RESERVED_USERNAMES.includes(value.toLowerCase());
}, "This username is not allowed.");

export default mongoose.model("User", UserSchema);
