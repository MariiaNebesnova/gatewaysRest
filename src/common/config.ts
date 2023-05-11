import dotenv from "dotenv";

export type EnvConfig = { PORT: string, DATABASE_URL: string };

export class Config {
    port: number;
    databaseUrl: string;
    constructor() {
        const _config = dotenv.config().parsed as EnvConfig;;
        this.port = Number(_config.PORT);
        this.databaseUrl = _config.DATABASE_URL;
    }
}