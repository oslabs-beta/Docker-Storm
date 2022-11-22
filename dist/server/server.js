import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 3000;
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/*', (req, res) => {
    return res.sendStatus(404);
});
app.use((err, req, res, _next) => {
    const defaultErr = {
        log: `GLOBAL ERROR HANDLER: caught unknown middleware error${err.toString()}`,
        status: 500,
        message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    if (errorObj.log)
        console.log(errorObj);
    return res.status(errorObj.status).json(errorObj.message);
});
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
module.exports = app;
