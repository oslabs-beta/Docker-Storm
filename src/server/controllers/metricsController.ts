import { Request, Response, NextFunction } from 'express';
import { Job, JobArray, Target, TargetIpArray, TargetsArray, ResponseObject, PanelObject } from '../../types.js';
import fs from 'fs';

interface MetricsController {
    getListOfTargets: ResponseObject;
    generatePanelBody: ResponseObject;
}

const metricsController: MetricsController = {
  getListOfTargets(req: Request, res: Response, next: NextFunction) {
    const targets: TargetsArray = JSON.parse(fs.readFileSync('./prometheus/targets.json', 'utf-8'));
    const jobsArray : JobArray = [];
    const targetsArray: TargetIpArray = [];

    targets.forEach((target: Target) => {
      jobsArray.push(target.labels.job);
      targetsArray.push(target.targets[0]);
    });

    res.locals.jobs = jobsArray;
    res.locals.targets = targetsArray;
    return next();
  },

  generatePanelBody(req: Request, res: Response, next: NextFunction){
    const {panelType, panelTitles, expr} = req.body;
    const panelObjects: PanelObject[] = [];
    
    panelTitles.forEach((title: string) => {
      const panelExpr = expr.replace(', job=<jobname>}', `, job='${title}'}`);
      panelObjects.push(
        {
          title: title,
          expression: panelExpr,
          graphType: panelType
        }
      );
    });

    res.locals.panels = {'panels': panelObjects};
    return next();
  }
};


export default metricsController;