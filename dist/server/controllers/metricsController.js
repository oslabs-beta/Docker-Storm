import fs from 'fs';
const metricsController = {
    getListOfTargets(req, res, next) {
        const targets = JSON.parse(fs.readFileSync('./prometheus/targets.json', 'utf-8'));
        const jobsArray = [];
        const targetsArray = [];
        targets.forEach((target) => {
            jobsArray.push(target.labels.job);
            targetsArray.push(target.targets[0]);
        });
        res.locals.jobs = jobsArray;
        res.locals.targets = targetsArray;
        return next();
    },
    generatePanelBody(req, res, next) {
        const { panelType, panelTitles, expr } = req.body;
        const panelObjects = [];
        panelTitles.forEach((title) => {
            const panelExpr = expr.replace(', job=<jobname>}', `, job='${title}'}`);
            panelObjects.push({
                title: title,
                expression: panelExpr,
                graphType: panelType
            });
        });
        res.locals.panels = { 'panels': panelObjects };
        return next();
    }
};
export default metricsController;
