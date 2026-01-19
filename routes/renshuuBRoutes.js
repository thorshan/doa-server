import express from "express";
import {
  createRenshuuB,
  getRenshuuB,
  getRenshuuBById,
  updateRenshuuB,
  deleteRenshuuB,
} from "../controllers/renshuuBController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getRenshuuB).post(authMiddleware, createRenshuuB);

router
  .route("/:id")
  .get(getRenshuuBById)
  .patch(authMiddleware, updateRenshuuB)
  .delete(authMiddleware, deleteRenshuuB);

export default router;
