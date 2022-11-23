import express from 'express';

import initController from '../controllers/initController.js';

const router = express.Router();
  
router.get('/', initController.initializeDatabase , (req, res) => {
  return res.status(200).json('successful');
});


export default router;
