import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import fetch from 'node-fetch';
// import db from '../models/dockerStormModel.js';
import * as dotenv from 'dotenv';
import { Result } from 'electron';
dotenv.config();

interface GrafanaController {
    createDB: (req: Request, res: Response, next: NextFunction) => void;
    updateDB: (req: Request, res: Response, next: NextFunction) => void;
}

interface ResultObj {
    // id: number;
    // slug: string;
    status: string;
    // uid: string;
    // url: string;
    // version: number;
    message: string;
}


const grafanaController: GrafanaController = {
  createDB(req,res,next) {
    const dash = (fs.readFileSync('./grafana/jsonTemplates/dbTemplate.json', 'utf-8'));

    fetch('http://localhost:3000/api/dashboards/db/', {
      method: 'POST',
      body: dash,
      headers: {
        'Content-type': 'application/json',
        'accept': 'application/json',
        'authorization': `Bearer ${process.env.GRAFANA_API_KEY}`
      },
    }).then((data) => data.json())
      .then((result) => {return result as ResultObj;})
      .then((result) => {
        console.log('Run!', result.status);
        return next();
      })
      .catch((err) => {
        console.log(err);
      });        
  },

  updateDB(req, res, next) {
    const panel = JSON.parse(fs.readFileSync('./grafana/jsonTemplates/gaugeTemplate.json', 'utf-8'));
    console.log(panel);
    
    return next();
  }
};


export default grafanaController;