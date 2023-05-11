import winston from "winston";

const { json } = winston.format;

export const winstonOptions = {
  format: json(),
  transports: [new winston.transports.Console()],
};

export const logger = winston.createLogger(winstonOptions);
