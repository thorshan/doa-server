import Module from "../models/Module.js";

const modules = [
  {
    key: "moji-goi",
    title: "Moji & Goi",
    order: 1,
    icon: "TranslateRounded",
  },
  {
    key: "grammar",
    title: "Grammar",
    order: 2,
    icon: "RuleRounded",
  },
  {
    key: "reading",
    title: "Reading",
    order: 3,
    icon: "MenuBookRounded",
  },
  {
    key: "listening",
    title: "Listening",
    order: 4,
    icon: "HeadphonesRounded",
  },
  {
    key: "speaking",
    title: "Speaking",
    order: 5,
    icon: "RecordVoiceOverRounded",
  },
  {
    key: "exams",
    title: "Exams",
    order: 6,
    icon: "QuizRounded",
  },
];

export const seedModules = async () => {
  await Module.deleteMany();
  await Module.insertMany(modules);
  console.log("Modules seeded");
};
