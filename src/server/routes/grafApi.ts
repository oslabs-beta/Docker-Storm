import express from 'express';
import grafanaController from '../controllers/grafanaController.js';

const router = express.Router();
  
router.post('/', grafanaController.createDB, (req, res) => {
  return res.status(200).json('successful');
});

router.patch('/', grafanaController.updateDB, (req, res) => {
  return res.status(200).json('successful');
});


export default router;
