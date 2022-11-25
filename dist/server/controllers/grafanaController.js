import fs from 'fs';
import fetch from 'node-fetch';
// import db from '../models/dockerStormModel.js';
import * as dotenv from 'dotenv';
dotenv.config();
const grafanaController = {
    createDB(req, res, next) {
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
            .then((result) => { return result; })
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
