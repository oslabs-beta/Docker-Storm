import { Request, Response, NextFunction } from 'express';
import db from '../models/dockerStormModel.js';
import { ResponseObject } from '../../types.js';
import fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config({override: true});


interface InitController {
    initializeDatabase: ResponseObject;
    updateEnv: ResponseObject;

}


const initController: InitController = {
  
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
      .then(() => {return next();})
      .catch((err) => {
        return next({
          log: 'Error caught in initialize DB',
          status: 400,
          message: err,
        });
      });
  },

  // apiKey
  // pgUri
  //GRAFANA_API_KEY
  updateEnv: (req, res, next) => {
    const f = fs.readFileSync('./.env', 'utf-8');
    if(!process.env.GRAFANA_API_KEY) {
      const str = `\nGRAFANA_API_KEY = '${req.body.apiKey}'`;
      fs.appendFileSync('./.env', str, 'utf-8');
    }
    if(!process.env.POSTGRES_URI) {
      const str = `\nPOSTGRES_URI = '${req.body.pgUri}'`;
      fs.appendFileSync('./.env', str, 'utf-8');
    }

    dotenv.config({override: true});
    console.log(process.env.GRAFANA_API_KEY);
    


    return next();
  }
};


export default initController;