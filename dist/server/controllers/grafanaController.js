import fs from 'fs';
import fetch from 'node-fetch';
// import db from '../models/dockerStormModel.js';
import * as dotenv from 'dotenv';
dotenv.config({ override: true });
const grafanaController = {
    createDB(req, res, next) {
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
            .then((result) => { return result; })
            .then((result) => {
            console.log(result);
            if (result.uid) {
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
    createPanel(req, res, next) {
        const { title, expression, graphType } = req.body;
        const panel = JSON.parse(fs.readFileSync(`./grafana/jsonTemplates/${graphType}Template.json`, 'utf-8'));
        panel.title = title;
        panel.targets[0].expr = expression;
        console.log(panel);
        res.locals.panel = panel;
        return next();
    },
    updateDB(req, res, next) {
        //console.log(panel);
        const { panel } = res.locals;
        const body = res.locals.dashboard;
        //console.log(body);
        if (!('panels' in body.dashboard)) {
            panel.id = 0;
            body.dashboard['panels'] = [panel];
        }
        else {
            panel.id = body.dashboard.panels.length;
            body.dashboard['panels'].push(panel);
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
            console.log(result);
            return next();
        });
    }
};
export default grafanaController;
