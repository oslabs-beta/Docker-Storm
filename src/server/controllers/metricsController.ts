import { Job, JobArray, Target, TargetIpArray, TargetsArray, ResponseObject, PanelObject, Role } from '../../types.js';
import fs from 'fs';

// Interface for controller
interface MetricsController {
    getListOfTargets: ResponseObject;
    generatePanelBody: ResponseObject;
    generateStaticPanels: ResponseObject;

}

// Controller
const metricsController: MetricsController = {

  /**
   * Method which will grab a list of targets from our targets.json and set it into res.locals
   */
  getListOfTargets(req, res, next) {
    const targets: TargetsArray = JSON.parse(fs.readFileSync('./prometheus/targets.json', 'utf-8'));
    const jobsArray : JobArray = [];
    const targetsArray: TargetIpArray = [];
    
    targets.forEach((target: Target) => {
      jobsArray.push(target.labels);
      targetsArray.push(target.targets[0]);
    });

    res.locals.jobs = jobsArray;
    res.locals.targets = targetsArray;
    return next();
  },

  /**
   * Method which will generate the panel body needed by the grafana controller given some values in a body
   * This method will iterate through each panelTitle and create a body object for it and push it back into the panels object
   */
  generatePanelBody(req, res, next){
    const {panelType, panelTitles, expr} = req.body;
    
    const panelObjects: PanelObject[] = [];
    
    panelTitles.forEach((job: Job) => {
      const title: string = job.job;
      const role: Role = job.role;

      if(role === 'Manager' || role === 'Worker'){
        const panelExpr = expr.replace(', job=<jobname>}', `, job='${title}'}`);
        panelObjects.push(
          {
            title,
            expression: panelExpr,
            graphType: panelType,
            role
          }
        );
      }
    });

    res.locals.panels = {'panels': panelObjects};

    return next();
  },

  /**
   * This method works to read from the staticPanels.json which has all of the panel bodies avaliable within it and save it to res.locals
   */
  generateStaticPanels(req, res, next){
    console.log('In generateStaticPanels');
    
    const staticPanelsArray: PanelObject[] = JSON.parse(fs.readFileSync('./grafana/staticPanels.json', 'utf-8'));
    res.locals.staticPanels = staticPanelsArray;
    return next();
  },
};


export default metricsController;