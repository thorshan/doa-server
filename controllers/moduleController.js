import Module from "../models/Module.js";

export const getAllModules = async (req, res) => {
  try {
    const modules = await Module.find();
    res.json(modules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getModuleById = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) return res.status(404).json({ error: "Module not found" });
    res.json(module);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createModule = async (req, res) => {
  try {
    const newModule = new Module(req.body);
    await newModule.save();
    res.status(201).json(newModule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateModule = async (req, res) => {
  try {
    const updated = await Module.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Module not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteModule = async (req, res) => {
  try {
    const deleted = await Module.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Module not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
