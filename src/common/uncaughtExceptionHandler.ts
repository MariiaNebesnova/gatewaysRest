import { logger } from "./logger";


export const runUncaughtExceptionHandler = () => {
    process.on('uncaughtException', (err: Error) => {
        logger.error(`UNCAUGHT EXCEPTION ${err.stack || err.message}`);
        process.exit();
    });
}