import express from 'express';
import { 
  createRenshuuA, 
  getRenshuuA, 
  getRenshuuAById, 
  updateRenshuuA, 
  deleteRenshuuA 
} from '../controllers/renshuuAController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getRenshuuA)
  .post(authMiddleware, createRenshuuA);

router.route('/:id')
  .get(getRenshuuAById)
  .patch(authMiddleware, updateRenshuuA)
  .delete(authMiddleware, deleteRenshuuA);

export default router;