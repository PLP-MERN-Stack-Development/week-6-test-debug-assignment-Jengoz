// server/src/routes/bugRoutes.js
import express from 'express';
import {
  getBugs,
  createBug,
  updateBug,
  deleteBug,
} from '../controllers/bugController.js';

const router = express.Router();

router.route('/')
  .get(getBugs)
  .post(createBug);

router.route('/:id')
  .put(updateBug)
  .delete(deleteBug);

export default router;




// server/src/routes/bugRoutes.js

// Placeholder routes for now
router.get('/', (req, res) => {
  res.json({ message: 'Bug list endpoint' });
});

