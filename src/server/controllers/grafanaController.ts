import fs from 'fs';
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
import * as manageID from '../helperFunctions/manageFiles.js';
import { ResponseObject } from '../../types.js';
dotenv.config({override: true});

//Necessary Interfaces for each function
interface GrafanaController {
    createDB: ResponseObject;
    updateDB: ResponseObject;
    getDashByUid: ResponseObject;
    createPanel: ResponseObject;
    addTarget: ResponseObject;
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

//Grab the grafID so the program can know which ID to assign a panel
let grafID = manageID.getGrafID();

//Controller
const grafanaController: GrafanaController = {

  /** 
   * This method will send a fetch request to the grafana HTTP API in order to create an empty dash
   * The empty dash will be created based off of paramaters that we send in through the dbTemplate.json file
   * We will also set the GRAFANA_DASHBOARD_ID so our application knows how to refrence the dashboard
   */
  createDB(req,res,next) {
    console.log('In createDB Controller');

    if(process.env.GRAFANA_DASHBOARD_ID) {
      return res.status(200).send({ApiKey: process.env.GRAFANA_DASHBOARD_ID});
    }

    const dash = fs.readFileSync('./grafana/jsonTemplates/dbTemplate.json', 'utf-8');

    fetch(`${process.env.GRAFANA_URL}api/dashboards/db/`, {
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
        return next(err);
        console.log(err);
      });        
  },

  /**
   * This method will use our dashboard id from the env and the grafana HTTP API in order to grab the json of the entire grafana dashboard
   * From there we will go ahead and save it in res.locals.dashboard to be used further down the middleware
   */
  getDashByUid(req, res, next) {
    console.log('In getDashByUid Controller!');
    dotenv.config({override: true});
    fetch(`${process.env.GRAFANA_URL}api/dashboards/uid/${process.env.GRAFANA_DASHBOARD_ID}`, {
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

  /**
   * This method is responsible for creating actual panel json files which grafana can understand
   * We will read from the body the entire array of panels and loop through each panel object
   * From there we can generate a newPanel json from a template created using the graphType from the current panel
   * We can then set important values within our newPanel using each panel's object info
   * The newPanel is then pushed into a panelsArray
   * Finally that array is saved into res.locals.panels
   */
  createPanel(req, res, next){
    console.log('In createPanel');
    const {panels} = req.body;
    const panelsArray: Record<string, unknown>[] = [];
    const panelPos = [0, 12];


    panels.forEach((panel: Panel, index: number) => {
      grafID = manageID.incrementGrafID(grafID);
      const newPanel = JSON.parse(fs.readFileSync(`./grafana/jsonTemplates/${panel.graphType}Template.json`, 'utf-8'));
      if(newPanel.gridPos.w === 12){
        newPanel.gridPos.x = panelPos[index % 2];
      }
      newPanel.title = panel.title;
      newPanel.targets[0].expr = panel.expression;
      newPanel.id = grafID.panelId;
      panelsArray.push(newPanel);
    });


    res.locals.panels = panelsArray;
    return next();
  },
  
  /**
   * This method works to update our actual dashboard with new panels
   * We will grab panels from res.locals and then push that into the dashboard in res.locals
   *  These are grabbed from previous middleware
   *  If the panels key does not already exist within our dashboard then we will first create it else just push
   * Once that is done we need to send a request to Grafana's HTTP API in order to save our changes
   */
  updateDB(req, res, next) {
    console.log('In updateDB!');

    const {panels} = res.locals;

    const body = res.locals.dashboard;
    if(!('panels' in body.dashboard)){
      body.dashboard['panels'] = [...panels];
    }
    else{
      body.dashboard['panels'].push(...panels);
    }

    fetch(`${process.env.GRAFANA_URL}api/dashboards/db/`, {
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

  /**
   * This method will work to add a new target into our targets.json file
   * We will first read from the file before pushing our body into it and writing over the file
   */
  addTarget(req, res, next) {
    const targets = JSON.parse(fs.readFileSync('./prometheus/targets.json', 'utf-8'));
    targets.push(req.body);
    fs.writeFileSync('./prometheus/targets.json', JSON.stringify(targets, null, 4));
    return next();
  }

};


export default grafanaController;