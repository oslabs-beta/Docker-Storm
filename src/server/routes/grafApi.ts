import express from 'express';
import grafanaController from '../controllers/grafanaController.js';

const router = express.Router();
  
// Get request that creates an EmptyDB (not used but left incase future iterations need this path)
router.get('/', grafanaController.createDB, (req, res) => {
  return res.status(200).json('successful');
});

// Post request that will work on initalizing the dashboard if it does not already exist based off of the panels already in targets
router.post('/init', grafanaController.createDB, grafanaController.getDashByUid, grafanaController.createPanel, grafanaController.updateDB, (req, res) => {
  return res.status(200).json({ApiKey: process.env.GRAFANA_DASHBOARD_ID});
});

// Patch request to update the dashboard with the provided panels
router.patch('/', grafanaController.getDashByUid, grafanaController.createPanel, grafanaController.updateDB, (req, res) => {
  return res.status(200).json('successful');
});

// Post request which adds new targets to our targets file for prometheus to track
router.post('/targetsAdd', grafanaController.addTarget, (req, res) => {
  return res.sendStatus(200);
});


export default router;
