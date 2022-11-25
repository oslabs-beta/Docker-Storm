import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import fetch from 'node-fetch';
// import db from '../models/dockerStormModel.js';
import * as dotenv from 'dotenv';
dotenv.config();

interface GrafanaController {
    createDB: (req: Request, res: Response, next: NextFunction) => void;
    updateDB: (req: Request, res: Response, next: NextFunction) => void;
}


const grafanaController: GrafanaController = {
  createDB(req,res,next) {
    const dash = JSON.parse(fs.readFileSync('./grafana/jsonTemplates/dbTemplate.json', 'utf-8'));

    fetch('http://localhost:3000/api/dashboards/db', {
      method: 'POST',
      body: JSON.stringify(dash),
      headers: {
        'Content-type': 'application/json',
        'accept': 'application/json',
        'authorization': `Bearer ${process.env.GRAPHANA_API_KEY}`
      },
    }).then((data) => data.json())
      .then((result) => {
        console.log(result);
        return next();
      })
      .catch((err) => next(err));



        
    
  },

  updateDB(req, res, next) {
    const panel = JSON.parse(fs.readFileSync('./grafana/jsonTemplates/gaugeTemplate.json', 'utf-8'));
    console.log(panel);
    
    return next();
  }
};


export default grafanaController;