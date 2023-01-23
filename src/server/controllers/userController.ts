import bcrypt from 'bcryptjs';
import db from '../models/dockerStormModel.js';
import { ResponseObject } from '../../types.js';

//Controller interface
interface UserController {
    verifyUser: ResponseObject;
    createUser: ResponseObject;
    encrypt: ResponseObject;
    updateUser: ResponseObject;
    deleteUser: ResponseObject;
    getAllUsers: ResponseObject;
    createAdminUser: ResponseObject;
    createAdminUserInfo: ResponseObject;
    checkEnv: ResponseObject;
}

//Controller
const userController: UserController = {

  /**
   * Method will verify that the user entered the correct credentials using bycrpt's compare
   * First we grab the user info then compare that hashed password to the input passsword
   */
  verifyUser: async (req, res, next) => {
    console.log('In verifyUser');

    const { password } = req.body;
    const username = req.body.username || req.cookies.username;
    const queryStr = 'SELECT * FROM users WHERE username = $1';
    console.log(username, password);

    try {
      db.query(queryStr, [username])
        .then((data) => {
          if(data.rows.length === 1){
            const validPassword = bcrypt.compareSync(password, data.rows[0].password);
            if(validPassword) return next();
            else {
              return next({
                log: 'Error caught in userController.verifyUser',
                status: 400,
                message: 'Missing username or password in request',
              });
            }
          } else {
            return next({
              log: 'Error caught in userController.verifyUser',
              status: 400,
              message: 'Missing username or password in request',
            });
          }
        });
    } catch {
      return next({
        log: 'Error caught in userController.verifyUser',
        status: 400,
        message: 'Missing username or password in request',
      });
    }
  },
    

  /**
   * This method will create a new user
   * We go ahead and insert a new user into our users table upon creation
   */
  createUser: async (req, res, next) => {
    console.log('In createUser');

    const { username, role } = req.body;

    try {
      if(!username || !res.locals.password) {
        return next({
          log: 'Error caught in userController.createUser',
          status: 400,
          message: 'Missing username or password in request',
        });
      }
      const queryStr = 'INSERT INTO users (username, password, role) VALUES ($1, $2, $3);';

      db.query(queryStr, [username, res.locals.password, role])
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

  /**
   * This method encrypt's our password using a has of 10 and the password passed into it saving it to res.locals
   */
  encrypt: async (req, res, next) => {
    console.log('In encrypt');
    const password = req.body.newPassword || req.body.password;

    const saltFactor = bcrypt.genSaltSync(10);
    res.locals.password = bcrypt.hashSync(password, saltFactor);
    return next();
  },

  /**
   * This method updates the user's password with a new hashed password
   */
  updateUser: (req, res, next) => {
    console.log('In updateUser');
    const username = req.cookies.username;
    const password = res.locals.password;

    const queryString = 'UPDATE users SET password=($1) WHERE username=($2);';
    
    db.query(queryString, [password, username])
      .then(() => next());
    
  },

  /**
   * This method if will delete the user from the users table
   */
  deleteUser: (req, res, next) => {
    console.log('In deleteUser');
    const { username } = req.body;

    const queryStr = 'DELETE FROM users WHERE username=($1);';

    db.query(queryStr, [username])
      .then(() => {
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  },


  /**
   * This method grabs each user and saves it into res.locals to display later
   */
  getAllUsers: (req,res,next) => {
    console.log('In getAllUsers');
    const queryString = 'SELECT * FROM users INNER JOIN users_info ON users.username = users_info.username';
    db.query(queryString, [])
      .then((result) => {
        res.locals.allUsers = result.rows;
        return next();
      })
      .catch((err: Error) => {
        return next({
          log: 'Error caught in getAllUsers',
          status: 400,
          message: {err: err}
        });
      });

  },

  /**
   * This method creates the admin user along with org info
   */
  createAdminUser: async (req, res, next) => {
    console.log('In createAdminUser');
    const { username, email, organization, jobTitle, password } = req.body;
    res.locals.username = username;
    res.locals.email = email;
    res.locals.organization = organization;
    res.locals.jobTitle = jobTitle;

    
    try {
      if(!username || !password) {
        return next({
          log: 'Error caught in userController.createAdminUser',
          status: 400,
          message: 'Missing username or password in request',
        });
      }
      const queryStr = 'INSERT INTO users (username, password, role) VALUES ($1, $2, \'admin\');';

      db.query(queryStr, [username, res.locals.password])
        .then(() => {return next();})
        .catch((err: Error) => {
          return next({
            log: 'Error caught in createAdminUser db call',
            status: 400,
            message: {err: err}
          });
        });

    } catch (error) {
      return next({
        log: 'Error caught in userController.createAdminUser',
        status: 400,
        message: 'Error in createAdminUser',
      });
    }
  },

  /**
   * This method populates the additional info for a specific user (email, org, job title)
   */
  createAdminUserInfo: async (req, res, next) => {
    console.log('In createAdminUserInfo');
    
    try {
      const queryStr = 'INSERT INTO users_info (username, email, organization, job_title) VALUES ($1, $2, $3, $4);';

      db.query(queryStr, [res.locals.username, res.locals.email, res.locals.organization, res.locals.jobTitle])
        .then(() => {return next();})
        .catch((err: Error) => {
          return next({
            log: 'Error caught in createAdminUser db call',
            status: 400,
            message: {err: err}
          });
        });

    } catch (error) {
      return next({
        log: 'Error caught in userController.createAdminUser',
        status: 400,
        message: 'Error in createAdminUser',
      });
    }
  },

  /**
   * This method sets the res.locals of grafUrl and apiKey
   */
  checkEnv: (req, res, next) => {
    console.log('In checkEnv');

    res.locals.grafUrl = process.env.GRAFANA_URL || '';  
    res.locals.apiKey = process.env.GRAFANA_API_KEY || '';
    return next();
  }



};

export default userController;