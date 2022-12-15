import express from 'express';

import initController from '../controllers/initController.js';

const router = express.Router();

// Get request which will initalize database tables if they dont exist
router.get('/', initController.initializeDatabase , (req, res) => {
  return res.status(200).json('successful');
});


export default router;
