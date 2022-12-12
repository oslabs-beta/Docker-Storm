import db from '../models/dockerStormModel.js';
import { ResponseObject } from '../../types.js';
import fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config({override: true});

// Interfaces needed for our controller
interface InitController {
    initializeDatabase: ResponseObject;
    updateEnv: ResponseObject;

}

//Controller
const initController: InitController = {
  
  /**
   * We will create the necessary tables if they do not already exist within our database
   */
  initializeDatabase: async (req, res, next) => {
    console.log('In init controller');
    
    const dbQuery = `CREATE TABLE IF NOT EXISTS users(
    "id" SERIAL NOT NULL,
    "username" text NOT NULL,
    "password" text NOT NULL,
    "role" text NOT NULL,
    PRIMARY KEY("id"),
    UNIQUE("username"));`;

    const dbQueryInfo = `
      CREATE TABLE IF NOT EXISTS users_info(
      "id" SERIAL NOT NULL,
      "username" text NOT NULL,
      "organization" text NOT NULL,
      "job_title" text NOT NULL,
      "email" text NOT NULL,
      PRIMARY KEY ("id"),
      CONSTRAINT "username" FOREIGN KEY ("username") REFERENCES users("username") ON DELETE CASCADE,
      UNIQUE ("username")
      );`;

    db.query(dbQuery, [])
      .then(() => {
        db.query(dbQueryInfo, [])
          .then(() => {return next();})
          .catch((err) => {
            return next({
              log: 'Error caught in initialize DB',
              status: 400,
              message: err,
            });
          });
      })
      .catch((err) => {
        return next({
          log: 'Error caught in initialize DB',
          status: 400,
          message: err,
        });
      });
  },

  /**
   * This method provides a way to update our GRAFANA_API_KEY along with GRAFANA_URL from within our application
   */
  updateEnv: (req, res, next) => {
    if(!process.env.GRAFANA_API_KEY) {
      const str = `\nGRAFANA_API_KEY = '${req.body.apiKey}'`;
      fs.appendFileSync('./.env', str, 'utf-8');
    }
    if(!process.env.GRAFANA_URL) {
      let s = req.body.grafUrl;
      if(s.at(-1) !== '/') s += '/';
      const str = `\nGRAFANA_URL = '${s}'`;
      fs.appendFileSync('./.env', str, 'utf-8');
    }

    dotenv.config({override: true});
    
    return next();
  }
};


export default initController;