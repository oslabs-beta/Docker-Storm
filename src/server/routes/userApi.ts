import express from 'express';

import userController from '../controllers/userController.js';
import cookieController from '../controllers/cookieController.js';
import initController from '../controllers/initController.js';

const router = express.Router();

// Get request to grab all users and return it
router.get('/all', userController.getAllUsers, (req,res) => {
  return res.status(200).json(res.locals.allUsers);
});

// Post request to handle user verification setting cookie and logging the user in
router.post('/login', userController.verifyUser, cookieController.setCookie, userController.checkEnv, (req, res) => {
  const obj = {
    grafUrl: res.locals.grafUrl,
    key: res.locals.apiKey
  };
  console.log(obj);
  return res.status(200).json(obj);
});

// Post request which allows us to update our env file
router.post('/env', initController.updateEnv, (req, res) => {
  return res.sendStatus(200);
});

// Post request which manages signing up specifically the admin user
router.post('/signupAdmin', userController.encrypt, userController.createAdminUser, userController.createAdminUserInfo, (req, res) => {
  return res.status(200).json('successful');
});

// Post request which manages signing up a new user account and encrypting their password
router.post('/signup', userController.encrypt, userController.createUser, (req, res) => {
  return res.status(200).json('successful');
});

// Patch request which will allow the user to change their password (old password must be verified first)
router.patch('/', userController.verifyUser, userController.encrypt, userController.updateUser, (req, res) => {
  return res.status(200).json('successful');
});

// Delete request which manages deleting a user
router.delete('/', userController.deleteUser, (req, res) => {
  return res.status(200).json('successful');
});

router.get('/cached', userController.checkEnv, (req, res) => {
  const obj = {
    apiKey: res.locals.apiKey,
    grafUrl: res.locals.grafUrl
  };
  return res.status(200).json(obj);
});

export default router;
