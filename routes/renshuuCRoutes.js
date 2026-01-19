import express from 'express';
import {
  createRenshuuC,
  getRenshuuC,
  getRenshuuCById,
  updateRenshuuC,
  deleteRenshuuC
} from '../controllers/renshuuCController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Base routes: /api/renshuuC
router.route('/')
  .get(getRenshuuC) // Use query params for filtering
  .post(authMiddleware, createRenshuuC);

// ID specific routes: /api/renshuuC/:id
router.route('/:id')
  .get(getRenshuuCById)
  .patch(authMiddleware, updateRenshuuC)
  .delete(authMiddleware, deleteRenshuuC);

export default router;