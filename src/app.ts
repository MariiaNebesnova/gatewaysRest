import express, { Application, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import { Config } from "./common/config";
import { DataBase } from "./common/db";
import { bindRoutes } from "./common/bindRoutes";
import { loggerMiddleware, errorLogger } from "./common/logger.middleware";
import { runUncaughtExceptionHandler } from "./common/uncaughtExceptionHandler";

// import { errorLogger, loggerMiddleware } from "./common/logger.middleware";

export class App {
    app: Application;
    config: Config;

    constructor(config: Config) {
        this.config = config;
        this.app = express();
    }

    async run() {
        const dataBase = new DataBase(this.config.databaseUrl);
        return dataBase.connect()
            .then(() => {
                this.app.use(bodyParser.json());
                this.app.use(express.static("build"));
                this.app.use(loggerMiddleware);
                runUncaughtExceptionHandler();

                this.app.use(bindRoutes(dataBase));

                this.app.use(errorLogger);

                this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
                    if (err) {
                        console.log(err); /// temporary
                        res.status(err.status || 500).send('Something broken');
                    }
                    next();
                });

                return this.app.listen(this.config.port, () => {
                    console.log(`listening on port ${this.config.port}`);
                });
            })
            .catch((err) => console.log("Unable to run server", err));


    }
}
