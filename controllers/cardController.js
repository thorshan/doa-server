import Card from "../models/Card.js";
/**
 * @description Get all cards
 * @route GET api/cards
 */
export const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: -1 });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch data : ", err });
  }
};

/**
 * @description Get One Card
 * @route GET api/cards/:id
 * @prams id
 */
export const getCard = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);
    if (!card) return res.status(404).json({ message: "Card not found." });
    res.json(card);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch data : ", err });
  }
};

/**
 * @description Extract Furigana helper function
 * @prams text
 */
const extractFurigana = (text) => {
  const regex = /([一-龯々〆ヵヶ]+)<(.*?)>/g;
  const results = [];
  let cleanText = text;

  let match;
  while ((match = regex.exec(text)) !== null) {
    const kanji = match[1];
    const reading = match[2];

    results.push({ kanji, reading });

    cleanText = cleanText.replace(`${kanji}<${reading}>`, kanji);
  }

  return { cleanText, results };
};

/**
 * @description Create Card
 * @route POST api/cards
 */
export const createCard = async (req, res) => {
  try {
    const { title, content, category, level, grammar } = req.body;
    const { cleanText, results } = extractFurigana(content);
    const card = await Card.create({
      title,
      category,
      level,
      originalContent: content,
      content: cleanText,
      furigana: results,
      grammar: grammar || [],
    });
    res.status(201).json({
      message: "Card created",
      card,
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating card : ", err });
  }
};

/**
 * @description Update Card
 * @route PUT api/cards/:id
 * @param id
 */
export const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, level } = req.body;
    const card = await Card.findById(id);
    if (!card) return res.status(404).json({ message: "Card not found" });

    if (title !== undefined) card.title = title;
    if (category !== undefined) card.category = category;
    if (level !== undefined) card.level = level;

    if (content !== undefined) {
      const { cleanText, results } = extractFurigana(content);
      card.content = cleanText;
      card.furigana = results;
    }
    if (grammar !== undefined) {
      card.grammar = grammar;
    }

    await card.save();
    res.json({
      message: "Card updated",
      card,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch data : ", err });
  }
};

/**
 * @description Delete Card
 * @route PUT api/cards/:id
 * @param id
 */
export const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);
    if (!card) return res.status(404).json({ message: "Card not found" });
    await Card.findByIdAndDelete(card._id);
    res.json({
      message: "Card deleted",
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch data : ", err });
  }
};
