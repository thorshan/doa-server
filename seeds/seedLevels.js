import Level from "../models/Level.js";

const levels = [
  {
    code: "N5",
    order: 1,
    title: "Beginner",
    description: "Basic Japanese for daily conversation",
    category: "jlpt",
  },
];

export const seedLevels = async () => {
  await Level.deleteMany();
  await Level.insertMany(levels);
  console.log("Levels seeded");
};
