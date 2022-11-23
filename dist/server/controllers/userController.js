import bcrypt from 'bcryptjs';
import db from '../models/dockerStormModel.js';
const userController = {
    verifyUser: async (req, res, next) => {
        const { username, password } = req.body;
        const queryStr = 'SELECT * FROM users WHERE username = $1';
        try {
            db.query(queryStr, [username])
                .then((data) => {
                if (data.rows.length === 1) {
                    const validPassword = bcrypt.compareSync(password, data.rows[0].password);
                    if (validPassword)
                        return next();
                    else {
                        return next({
                            log: 'Error caught in userController.verifyUser',
                            status: 400,
                            message: 'Missing username or password in request',
                        });
                    }
                }
                else {
                    return next({
                        log: 'Error caught in userController.verifyUser',
                        status: 400,
                        message: 'Missing username or password in request',
                    });
                }
            });
        }
        catch {
            return next({
                log: 'Error caught in userController.verifyUser',
                status: 400,
                message: 'Missing username or password in request',
            });
        }
    },
    createUser: async (req, res, next) => {
        const { username, role } = req.body;
        try {
            if (!username || !res.locals.password) {
                return next({
                    log: 'Error caught in userController.createUser',
                    status: 400,
                    message: 'Missing username or password in request',
                });
            }
            const queryStr = 'INSERT INTO users (username, password, role) VALUES ($1, $2, $3);';
            db.query(queryStr, [username, res.locals.password, role])
                .then(() => { return next(); })
                .catch((err) => {
                return next({
                    log: 'Error caught in createUser db call',
                    status: 400,
                    message: { err: err }
                });
            });
        }
        catch (error) {
            return next({
                log: 'Error caught in userController.createUser',
                status: 400,
                message: 'Username already taken',
            });
        }
    },
    encrypt: async (req, res, next) => {
        const { password } = req.body;
        const saltFactor = bcrypt.genSaltSync(10);
        res.locals.password = bcrypt.hashSync(password, saltFactor);
        return next();
    }
};
export default userController;
