import express from 'express';
import userController from '../controllers/userController.js';
import cookieController from '../controllers/cookieController.js';
import initController from '../controllers/initController.js';
const router = express.Router();
router.get('/all', userController.getAllUsers, (req, res) => {
    return res.status(200).json(res.locals.allUsers);
});
router.post('/login', userController.verifyUser, cookieController.setCookie, userController.checkEnv, (req, res) => {
    const obj = {
        db: res.locals.dbUri,
        key: res.locals.apiKey
    };
    console.log(obj);
    return res.status(200).json(obj);
});
router.post('/env', initController.updateEnv, (req, res) => {
    return res.sendStatus(200);
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
