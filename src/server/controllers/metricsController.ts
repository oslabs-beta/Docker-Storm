import { Request, Response, NextFunction } from 'express';
import { Job, JobArray, Target, TargetIpArray, TargetsArray, ResponseObject, PanelObject, Role } from '../../types.js';
import fs from 'fs';

interface MetricsController {
    getListOfTargets: ResponseObject;
    generatePanelBody: ResponseObject;
    generateStaticPanels: ResponseObject;
}

const metricsController: MetricsController = {
  getListOfTargets(req: Request, res: Response, next: NextFunction) {
    const targets: TargetsArray = JSON.parse(fs.readFileSync('./prometheus/targets.json', 'utf-8'));
    const jobsArray : JobArray = [];
    const targetsArray: TargetIpArray = [];

    targets.forEach((target: Target) => {
      jobsArray.push(target.labels);
      targetsArray.push(target.targets[0]);
    });

    res.locals.jobs = jobsArray;
    res.locals.targets = targetsArray;
    console.log(res.locals.jobs);
    return next();
  },

  generatePanelBody(req: Request, res: Response, next: NextFunction){
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

  generateStaticPanels(req: Request, res: Response, next: NextFunction){
    const staticPanelsArray: PanelObject[] = JSON.parse(fs.readFileSync('./grafana/staticPanels.json', 'utf-8'));

    console.log(staticPanelsArray);
    res.locals.staticPanels = staticPanelsArray;
    return next();
  },
};


export default metricsController;