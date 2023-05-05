import { Response, Router } from "express";

export abstract class BaseController<T> {
    router: Router;
    service: T;

    constructor(router: Router, service: T) {
        this.router = router;
        this.service = service;
        this.initRoutes();
    }

    abstract initRoutes(): void;

    successHandler(res: Response, result: any) {
        res.status(200).json(result);
    }

    errorHandler(res:Response, message: string, code?: any) {
        res.status(400 || code).json({ message });
    }
}