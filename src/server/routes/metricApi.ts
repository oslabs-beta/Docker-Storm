import express from 'express';
import metricsController from '../controllers/metricsController.js';

const router = express.Router();

// Get request which gets the entire list of avaliable targets and return it
router.get('/', metricsController.getListOfTargets, (req, res) => {
  return res.status(200).json({targets: res.locals.targets, jobs: res.locals.jobs});
});

// Post request which generate panel bodies based off of the info provided to it (to be used by the grafana controller)
router.post('/genPanel', metricsController.generatePanelBody, (req, res) => {
  return res.status(200).json(res.locals.panels);
});

// Get request which grabs all the static panel body values from a file and returns it
router.get('/genStaticPanels', metricsController.generateStaticPanels, (req, res) => {
  return res.status(200).json(res.locals.staticPanels);
});

export default router;
