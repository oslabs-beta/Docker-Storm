import db from '../models/dockerStormModel.js';
const initController = {
    initializeDatabase: async (req, res, next) => {
        console.log('in controller');
        const dbQuery = `CREATE TABLE IF NOT EXISTS users(
    "id" SERIAL NOT NULL,
    "username" text NOT NULL,
    "password" text NOT NULL,
    "role" text NOT NULL,
    PRIMARY KEY("id"),
    UNIQUE("username"));`;
        db.query(dbQuery, [])
            .then(() => { return next(); })
            .catch((err) => {
            return next({
                log: 'Error caught in initialize DB',
                status: 400,
                message: err,
            });
        });
    },
    updateEnv: (req, res, next) => {
        return next();
    }
};
export default initController;
