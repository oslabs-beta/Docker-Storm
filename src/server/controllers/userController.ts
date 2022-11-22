import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import db from '../models/dockerStormModel.js';


interface UserController {
    verifyUser: (req: Request, res: Response, next: NextFunction) => void;
    createUser: (req: Request, res: Response, next: NextFunction) => void;
    encrypt: (req: Request, res: Response, next: NextFunction) => void;

}




const userController: UserController = {

  verifyUser: async (req, res, next) => {
    const { username, password } = req.body;
    const queryStr = '';
    
    
    //bcrypt.compareSync();
  },

  createUser: async (req, res, next) => {
    const { username } = req.body;
    try {
      if(!username || !res.locals.password) {
        return next({
          log: 'Error caught in userController.createUser',
          status: 400,
          message: 'Missing username or password in request',
        });
      }
      const queryStr = 'INSERT INTO users (username, password) VALUES ($1, $2);';

      db.query(queryStr, [username, res.locals.password])
        .then(() => {return next();})
        .catch((err: Error) => {
          return next({
            log: 'Error caught in createUser db call',
            status: 400,
            message: {err: err}
          });
        });

    } catch (error) {
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