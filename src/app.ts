/*
Author: Parishkar Singh
Date: 28-June-2023
TechStack->>  NodeJS, Typescript, Express
*
Description:The Project is Node.js backend template configured to work with typescript.
*
This file is the entry point of Server Code.
*
This also Contains a custom logger to see your error in beautiful format.
*
It is responsible for starting the server and connecting to the database.
*
EC2 command to start the server: pm2 start src/app.ts --name quasar-backend or npm run online
_____________________________________________________________________________
.env Looks like this:
PORT=""
DBURI=""
SALT_WORK_FACTOR=10
_____________________________________________________________________________
*
 */
import express from 'express';
import config from 'config';
import 'dotenv/config'
import cors from 'cors';

// Custom imports
import connect from './utils/connect';
import logger from "./utils/logger";
import routes from "./routes";


// Middlewares
const app = express();
app.use(express.json())
app.use(cors({
    origin: '*'
}));

// Env variables
const PORT = config.get<number>('port')
const appVersion = '1.0.0' as string;

// System
var pid = process.pid;
var os = require('os');

// Routes
app.get('/', (req, res) => {
    const message =
        `<h1 style="color: green; ">Server Online</h1>
<span style="color:red;">
     Version: ${appVersion}<br> PID: ${pid}
</span>`;
    // logger.silly('Quasar Online');
    res.send(message);
});

app.listen(PORT, async () => {
    logger.info(`Server Online @ http://localhost:${PORT}`);
    await connect();
    routes(app);
});


