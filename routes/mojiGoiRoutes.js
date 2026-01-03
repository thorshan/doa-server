import express from "express";
import {
  getAllMojiGoi,
  getMojiGoiById,
  createMojiGoi,
  updateMojiGoi,
  deleteMojiGoi,
} from "../controllers/mojigoiController.js";

const router = express.Router();

router.get("/", getAllMojiGoi);
router.get("/:id", getMojiGoiById);
router.post("/", createMojiGoi);
router.put("/:id", updateMojiGoi);
router.delete("/:id", deleteMojiGoi);

export default router;
