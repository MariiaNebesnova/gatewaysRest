import { Request, Response } from "express";
import expressWinston from "express-winston";
import { winstonOptions } from "./logger";

const msg = (req: Request, res: Response) => `HTTP ${req.method} ${req.url} ${JSON.stringify(req.body)}`;

export const loggerMiddleware = expressWinston.logger({
    ...winstonOptions,
    msg,
})

export const errorLogger = expressWinston.errorLogger({
    ...winstonOptions,
    msg,
})

export const methodErrorLogger = (methodName: string) => {
    return expressWinston.errorLogger({
        ...winstonOptions,
        msg: (req: Request, res: Response) => `method:${methodName} params:${JSON.stringify(req.params)} body:${JSON.stringify(req.body)}`,
    })
}