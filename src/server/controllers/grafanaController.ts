import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import fetch from 'node-fetch';
// import db from '../models/dockerStormModel.js';
import * as dotenv from 'dotenv';
import { Result } from 'electron';
dotenv.config({override: true});

interface GrafanaController {
    createDB: (req: Request, res: Response, next: NextFunction) => void;
    updateDB: (req: Request, res: Response, next: NextFunction) => void;
    getDashByUid: (req: Request, res: Response, next: NextFunction) => void;
    createPanel: (req: Request, res: Response, next: NextFunction) => void;
}

interface ResultObj {
    id?: number;
    slug?: string;
    status: string;
    uid?: string;
    url?: string;
    version?: number;
    message: string;
}


const grafanaController: GrafanaController = {
  createDB(req,res,next) {
    const dash = fs.readFileSync('./grafana/jsonTemplates/dbTemplate.json', 'utf-8');

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
        console.log(result);
        if(result.uid) {
          const str = `\nGRAFANA_DASHBOARD_ID = '${result.uid}'`;
          fs.appendFileSync('./.env', str, 'utf-8');
          return next();
        }
        return next();
      })
      .catch((err) => {
        console.log(err);
      });        
  },

  getDashByUid(req, res, next) {
    fetch(`http://localhost:3000/api/dashboards/uid/${process.env.GRAFANA_DASHBOARD_ID}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'accept': 'application/json',
        'authorization': `Bearer ${process.env.GRAFANA_API_KEY}`
      },
    })
      .then((data) => data.json())
      .then((dashboard) => {
        res.locals.dashboard = dashboard;
        return next();
      });
  },

  createPanel(req, res, next){
    const panel = JSON.parse(fs.readFileSync('./grafana/jsonTemplates/gaugeTemplate.json', 'utf-8'));
    
    res.locals.panel = panel;
    return next();
  },
  
  
  updateDB(req, res, next) {
    //console.log(panel);

    const {panel} = res.locals;

    const body = res.locals.dashboard;
    console.log(body);

    if(!('panels' in body.dashboard))
      body.dashboard['panels'] = [panel];
    else
      body.dashboard['panels'].push(panel);

    fetch('http://localhost:3000/api/dashboards/db/', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json',
        'accept': 'application/json',
        'authorization': `Bearer ${process.env.GRAFANA_API_KEY}`
      },
    })
      .then((data) => data.json())
      .then((result) => {
        console.log(result);
        return next();
      });
  }
};


export default grafanaController;