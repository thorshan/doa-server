import Level from "../models/Level.js";
import MojiGoi from "../models/MojiGoi.js";
import Grammar from "../models/Grammar.js";
import Reading from "../models/Reading.js";
import Listening from "../models/Listening.js";
import Speaking from "../models/Speaking.js";
import Exam from "../models/Exam.js";

export const seedData = async () => {
  try {
    // Clear old data
    await Level.deleteMany({});
    await MojiGoi.deleteMany({});
    await Grammar.deleteMany({});
    await Reading.deleteMany({});
    await Listening.deleteMany({});
    await Speaking.deleteMany({});
    await Exam.deleteMany({});

    // Create Level
    const n5Level = await Level.create({
      code: "N5",
      order: 1,
      title: "Beginner",
      description: "Basic Japanese",
      category: "jlpt",
    });

    // Seed MojiGoi (Vocabulary) with kanji and module
    const mojiGoiSample = await MojiGoi.create([
      { word: "私", reading: "わたし", meaning: "I / me", level: n5Level._id, kanji: "私", module: "moji-goi" },
      { word: "学生", reading: "がくせい", meaning: "Student", level: n5Level._id, kanji: "学", module: "moji-goi" },
      { word: "先生", reading: "せんせい", meaning: "Teacher", level: n5Level._id, kanji: "先", module: "moji-goi" },
      { word: "学校", reading: "がっこう", meaning: "School", level: n5Level._id, kanji: "校", module: "moji-goi" },
      { word: "本", reading: "ほん", meaning: "Book", level: n5Level._id, kanji: "本", module: "moji-goi" },
      { word: "猫", reading: "ねこ", meaning: "Cat", level: n5Level._id, kanji: "猫", module: "moji-goi" },
      { word: "犬", reading: "いぬ", meaning: "Dog", level: n5Level._id, kanji: "犬", module: "moji-goi" },
      { word: "水", reading: "みず", meaning: "Water", level: n5Level._id, kanji: "水", module: "moji-goi" },
      { word: "食べる", reading: "たべる", meaning: "To eat", level: n5Level._id, kanji: "食", module: "moji-goi" },
      { word: "飲む", reading: "のむ", meaning: "To drink", level: n5Level._id, kanji: "飲", module: "moji-goi" },
      { word: "行く", reading: "いく", meaning: "To go", level: n5Level._id, kanji: "行", module: "moji-goi" },
      { word: "来る", reading: "くる", meaning: "To come", level: n5Level._id, kanji: "来", module: "moji-goi" },
      { word: "見る", reading: "みる", meaning: "To see", level: n5Level._id, kanji: "見", module: "moji-goi" },
      { word: "聞く", reading: "きく", meaning: "To listen", level: n5Level._id, kanji: "聞", module: "moji-goi" },
      { word: "話す", reading: "はなす", meaning: "To speak", level: n5Level._id, kanji: "話", module: "moji-goi" },
      { word: "買う", reading: "かう", meaning: "To buy", level: n5Level._id, kanji: "買", module: "moji-goi" },
      { word: "高い", reading: "たかい", meaning: "Expensive / tall", level: n5Level._id, kanji: "高", module: "moji-goi" },
      { word: "安い", reading: "やすい", meaning: "Cheap", level: n5Level._id, kanji: "安", module: "moji-goi" },
      { word: "新しい", reading: "あたらしい", meaning: "New", level: n5Level._id, kanji: "新", module: "moji-goi" },
      { word: "古い", reading: "ふるい", meaning: "Old", level: n5Level._id, kanji: "古", module: "moji-goi" },
    ]);

    // Seed Grammar (references MojiGoi)
    await Grammar.create([
      {
        title: "です/ます",
        structure: "Noun + です / Verb + ます",
        meaning: "Polite sentence ending",
        explanation: "Used to make sentences polite",
        level: n5Level._id,
        examples: [
          { jp: "これは本です。", reading: "これはほんです。", en: "This is a book." },
          { jp: "私は学生です。", reading: "わたしはがくせいです。", en: "I am a student." },
        ],
        relatedVocabulary: [mojiGoiSample[0]._id, mojiGoiSample[1]._id, mojiGoiSample[4]._id],
        tags: ["polite", "basic"],
      },
      // ... add other grammar entries as before
    ]);

    // Seed Reading
    await Reading.create([
      { title: "Reading 1", content: "これは私の本です。", level: n5Level._id },
      { title: "Reading 2", content: "私は学生です。", level: n5Level._id },
      { title: "Reading 3", content: "学校に行きます。", level: n5Level._id },
      { title: "Reading 4", content: "猫がいます。", level: n5Level._id },
      { title: "Reading 5", content: "犬が好きです。", level: n5Level._id },
    ]);

    // Seed Listening
    await Listening.create([
      { title: "Listening 1", audioUrl: "https://example.com/audio1.mp3", level: n5Level._id },
      { title: "Listening 2", audioUrl: "https://example.com/audio2.mp3", level: n5Level._id },
      { title: "Listening 3", audioUrl: "https://example.com/audio3.mp3", level: n5Level._id },
      { title: "Listening 4", audioUrl: "https://example.com/audio4.mp3", level: n5Level._id },
      { title: "Listening 5", audioUrl: "https://example.com/audio5.mp3", level: n5Level._id },
    ]);

    // Seed Speaking
    await Speaking.create([
      { title: "Speaking 1", prompt: "Introduce yourself in Japanese.", level: n5Level._id },
      { title: "Speaking 2", prompt: "Say what you like.", level: n5Level._id },
      { title: "Speaking 3", prompt: "Ask where something is.", level: n5Level._id },
      { title: "Speaking 4", prompt: "Ask someone to join you.", level: n5Level._id },
      { title: "Speaking 5", prompt: "Talk about your daily routine.", level: n5Level._id },
    ]);

    // Seed Exams
    await Exam.create([
      {
        title: "N5 Sample Exam 1",
        questions: [
          { question: "Translate to Japanese: I am a student.", type: "writing", answer: "私は学生です。" },
          { question: "Translate to Japanese: I like cats.", type: "writing", answer: "猫が好きです。" },
          { question: "Choose the correct particle: 学校__行きます。", type: "multiple", options: ["に", "で"], answer: "に" },
        ],
        level: n5Level._id,
      },
      {
        title: "N5 Sample Exam 2",
        questions: [
          { question: "Translate to Japanese: I drink water.", type: "writing", answer: "水を飲みます。" },
          { question: "Translate to Japanese: There is a cat.", type: "writing", answer: "猫がいます。" },
        ],
        level: n5Level._id,
      },
    ]);

    console.log("N5 seed completed successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
