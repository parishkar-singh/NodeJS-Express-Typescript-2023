/*
TechStack->>  Node.js, Typescript, Express, MongoDB
Deployment--> Docker, Docker-compose, EC2, Nginx, PM2
*
This file is the ❤ of the server 0_0
*/

import config from 'config';
import 'dotenv/config'
import connect from './utils/connect';
import createServer from "./utils/server";
import logger from "./utils/logger";
import * as os from "os";

const app = createServer()
app.get('/', (req, res) => {
    res.send(`backend is running`);
});
app.listen(config.get<number>('port'), async () => {
    logger.info(`Server Online @server.${config.get<string>('domain')}`);
    await connect();
});
