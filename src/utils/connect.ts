import mongoose from 'mongoose';
import config from "config";
import logger from './logger';

async function connect() {
    const dbURI = config.get<string>('dbURI');
    try {
        await mongoose.connect(dbURI);
        logger.info('Mongo AWS Connected');
        // console.log('Database Connected');
    } catch (err) {
        console.error(err);
        logger.error('Could not connect to database');
        process.exit(1);
    }
}

export default connect;
