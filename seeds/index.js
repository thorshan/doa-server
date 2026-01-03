import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDb } from "../config/database.js";
// import { seedLevels } from "./seedLevels.js";
// import { seedModules } from "./seedModules.js";
import { seedData } from "./n5seed.js";

dotenv.config();

const runSeeds = async () => {
  await connectDb();
  await seedData();
  // await seedLevels();
  // await seedModules();

  console.log("Seeding complete");
  mongoose.connection.close();
};

runSeeds();
