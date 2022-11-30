import express from 'express';
import metricsController from '../controllers/metricsController.js';

const router = express.Router();

router.get('/', metricsController.getListOfTargets, (req, res) => {
  return res.status(200).json({targets: res.locals.targets, jobs: res.locals.jobs});
});

router.post('/genPanel', metricsController.generatePanelBody, (req, res) => {
  return res.status(200).json(res.locals.panels);
});

export default router;
