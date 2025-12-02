import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log(`DATABASE CONNECTED ON : ${mongoose.connection.host}`);
  } catch (err) {
    console.error("Failed to connect:", err.message);
    process.exit(1);
  }
};
