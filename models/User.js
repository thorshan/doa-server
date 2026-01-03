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
      passed: {
        type: [String],
        default: [],
      },
      current: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      index: true,
    },
    isActive: { type: Boolean, default: true },
    isEmailVerified: { type: Boolean, default: false },

    emailVerifyOTP: { type: String },
    emailVerifyExpire: { type: Date },

    lastLogin: Date,
  },
  { timestamps: true }
);

const RESERVED_USERNAMES = ["admin", "superadmin", "user", "superuser"];

UserSchema.path("username").validate((value) => {
  return !RESERVED_USERNAMES.includes(value.toLowerCase());
}, "This username is not allowed.");

UserSchema.methods.createEmailOTP = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
  this.emailVerifyOTP = otp;
  this.emailVerifyExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  return otp;
};

export default mongoose.model("User", UserSchema);
