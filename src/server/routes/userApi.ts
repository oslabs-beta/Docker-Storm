import express from 'express';

import userController from '../controllers/userController.js';

const router = express.Router();

router.post('/login', userController.verifyUser, (req, res) => {
  return res.status(200).json('successful');
});

router.post('/signup', userController.encrypt, userController.createUser, (req, res) => {
  return res.status(200).json('successful');
});

export default router;
