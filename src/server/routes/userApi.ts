import express from 'express';

import userController from '../controllers/userController.js';
import cookieController from '../controllers/cookieController.js';

const router = express.Router();

router.post('/login', userController.verifyUser, cookieController.setCookie,(req, res) => {
  return res.status(200).json('successful');
});

router.post('/signup', userController.encrypt, userController.createUser, (req, res) => {
  return res.status(200).json('successful');
});

router.patch('/', userController.verifyUser, userController.encrypt, userController.updateUser, (req, res) => {
  return res.status(200).json('successful');
});

router.delete('/', userController.deleteUser, (req, res) => {
  return res.status(200).json('successful');
});


export default router;
