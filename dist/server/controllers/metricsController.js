import fs from 'fs';
const metricsController = {
    getListOfTargets(req, res, next) {
        const targets = JSON.parse(fs.readFileSync('./prometheus/targets.json', 'utf-8'));
        const jobsArray = [];
        const targetsArray = [];
        targets.forEach((target) => {
            jobsArray.push(target.labels);
            targetsArray.push(target.targets[0]);
        });
        res.locals.jobs = jobsArray;
        res.locals.targets = targetsArray;
        console.log(res.locals.jobs);
        return next();
    },
    generatePanelBody(req, res, next) {
        const { panelType, panelTitles, expr } = req.body;
        const panelObjects = [];
        panelTitles.forEach((job) => {
            const title = job.job;
            const role = job.role;
            if (role === 'Manager' || role === 'Worker') {
                const panelExpr = expr.replace(', job=<jobname>}', `, job='${title}'}`);
                panelObjects.push({
                    title,
                    expression: panelExpr,
                    graphType: panelType,
                    role
                });
            }
        });
        res.locals.panels = { 'panels': panelObjects };
        return next();
    },
    generateRamUsage(req, res, next) {
        const panelObj = {
            title: 'Machine Ram Usage',
            expression: 'expression: \'100 * (1 - ((avg_over_time(node_memory_MemFree_bytes[1m]) + avg_over_time(node_memory_Cached_bytes[1m]) + avg_over_time(node_memory_Buffers_bytes[1m])) / avg_over_time(node_memory_MemTotal_bytes[1m])))\'',
            graphType: 'line',
            role: 'Overall'
        };
        res.locals.ramPanel = { 'panels': [panelObj] };
        return next();
    },
    generateOverallCpu(req, res, next) {
        res.locals.cpuPanel = {};
        return next();
    }
};
export default metricsController;
