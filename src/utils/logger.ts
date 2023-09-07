import winston from 'winston';

// Custom format for pretty printing
const prettyPrintFormat = winston.format.printf(({level, message, timestamp}) => {
    return `${timestamp} [${level}]: ${message}`;
});

// Create a winston logger instance
const log = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        winston.format.colorize(),
        prettyPrintFormat
    ),
    transports: [
        new winston.transports.Console(),
    ],
});

export default log;
