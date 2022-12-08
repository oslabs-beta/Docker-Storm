import fs from 'fs';
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
import * as manageID from '../helperFunctions/manageFiles.js';
import { ResponseObject } from '../../types.js';
dotenv.config({override: true});

interface GrafanaController {
    createDB: ResponseObject;
    updateDB: ResponseObject;
    getDashByUid: ResponseObject;
    createPanel: ResponseObject;
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

interface Panel {
    title: string;
    expression: string;
    graphType: string;
}

let grafID = manageID.getGrafID();

const grafanaController: GrafanaController = {
  createDB(req,res,next) {
    if(process.env.GRAFANA_DASHBOARD_ID) {
      return res.status(200).send({ApiKey: process.env.GRAFANA_DASHBOARD_ID});
    }

    const dash = fs.readFileSync('./grafana/jsonTemplates/dbTemplate.json', 'utf-8');
    console.log('CREATEDB');
    console.log(process.env.GRAFANA_API_KEY);

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
          console.log('LOOKING FOR THIS', str);
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
    console.log('Here GETDASH!');
    dotenv.config({override: true});
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
    console.log('here CREATEPANEL');
    const {panels} = req.body;
    const panelsArray: Record<string, unknown>[] = [];

    panels.forEach((panel: Panel) => {
      grafID = manageID.incrementGrafID(grafID);
      const newPanel = JSON.parse(fs.readFileSync(`./grafana/jsonTemplates/${panel.graphType}Template.json`, 'utf-8'));
      newPanel.title = panel.title;
      newPanel.targets[0].expr = panel.expression;
      newPanel.id = grafID.panelId;
      panelsArray.push(newPanel);
    });

    res.locals.panels = panelsArray;
    return next();
  },
  
  
  updateDB(req, res, next) {
    console.log('Here UPDATEDB!');

    const {panels} = res.locals;

    const body = res.locals.dashboard;
    console.log('body', body);

    if(!('panels' in body.dashboard)){
      body.dashboard['panels'] = [...panels];
    }
    else{
      body.dashboard['panels'].push(...panels);
    }


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
        return next();
      });
  },
};


export default grafanaController;