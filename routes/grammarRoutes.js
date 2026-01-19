import express from 'express';
import { 
  createGrammar, 
  getGrammars, 
  getGrammarById,
  updateGrammar, 
  deleteGrammar 
} from '../controllers/grammarController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// General routes
router.route('/')
  .get(getGrammars)
  .post(authMiddleware, createGrammar);

// Specific ID routes
router.route('/:id')
  .get(getGrammarById)
  .patch(authMiddleware, updateGrammar)
  .delete(authMiddleware, deleteGrammar);

export default router;