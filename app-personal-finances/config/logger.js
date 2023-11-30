import winston from 'winston';
import winstondb from 'winston-mongodb';
import dotenv from 'dotenv';

const { combine, timestamp, label, printf } = winston.format;

const { createLogger, transports, format } = winston;

const myFormat = format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
dotenv.config();
const { DB_CONNECTION } = process.env;
const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.MongoDB({
      level: 'info',
      db: DB_CONNECTION,
      collection: 'logs_transaction',
      capped: true,
      cappedMax: 150,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
  ],
  format: format.combine(
    label({ label: 'transaction-api' }),
    format.timestamp(),
    myFormat
  ),
});

export { logger };