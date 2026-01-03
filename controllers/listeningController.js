import Listening from "../models/Listening.js";

export const getAllListening = async (req, res) => {
  try {
    const list = await Listening.find().populate("level");
    res.json(list);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

export const getListeningById = async (req, res) => {
  try {
    const list = await Listening.findById(req.params.id).populate("level");
    if (!list) return res.status(404).json({ error: "Listening not found" });
    res.json(list);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

export const createListening = async (req, res) => {
  try {
    const list = await Listening.create(req.body);
    res.status(201).json(list);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

export const updateListening = async (req, res) => {
  try {
    const list = await Listening.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!list) return res.status(404).json({ error: "Listening not found" });
    res.json(list);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

export const deleteListening = async (req, res) => {
  try {
    const list = await Listening.findByIdAndDelete(req.params.id);
    if (!list) return res.status(404).json({ error: "Listening not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
