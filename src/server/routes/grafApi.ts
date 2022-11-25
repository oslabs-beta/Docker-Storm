import express from 'express';
import grafanaController from '../controllers/grafanaController.js';

const router = express.Router();
  
router.get('/', grafanaController.createDB, (req, res) => {
  return res.status(200).json('successful');
});

router.post('/init', grafanaController.initDB, grafanaController.createDB, grafanaController.getDashByUid, grafanaController.createPanel, grafanaController.updateDB, (req, res) => {
  return res.status(200).json('successful');
});

router.patch('/', grafanaController.getDashByUid, grafanaController.createPanel, grafanaController.updateDB, (req, res) => {
  return res.status(200).json('successful');
});




export default router;
