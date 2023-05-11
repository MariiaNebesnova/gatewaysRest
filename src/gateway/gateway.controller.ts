import { NextFunction, Request, Response, Router } from "express";
import { BaseController } from "../common/baseClasses/baseController";
import { GatewayService } from "./gateway.service";
import { newGatewaySchema, removeGatewaySchema } from "./utils/gatewayValidation";
import { validateBody, validateParams } from "../common/validateSchema.middleware";

export class GatewayController extends BaseController<GatewayService> {
    constructor(
        router: Router,
        gatewayService: GatewayService,
    ) {
        super(router, gatewayService);
    }

    initRoutes(): void {
        this.router.get('/gateways', this.getGateways.bind(this));
        this.router.get('/gateways/:id', this.getGateway.bind(this));
        this.router.post('/gateways/new', validateBody(newGatewaySchema), this.createGateway.bind(this));
        this.router.delete('/gateways/remove/:id', validateParams(removeGatewaySchema), this.removeGateway.bind(this));
    }

    async getGateways(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.service.getGateways();
            if (result) this.successHandler(res, result);
            else this.errorHandler(res, "No gateways found");
        } catch (error) {
            next(error);
        }
    }

    async getGateway(req: Request, res: Response, next: NextFunction) {
        try {
            const gateway = await this.service.getGateway(req.params.id);
            res.status(200).json(gateway);
        } catch (error) {
            next(error);
        }
    }

    async createGateway(req: Request, res: Response, next: NextFunction) {
        try {
            const gateway = await this.service.createGateway(req.body);
            res.status(200).json(gateway);
        } catch (error) {
            next(error);
        }
    }

    async removeGateway(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.service.removeGateway(req.params.id);
            if (result) this.successHandler(res, result);
            else this.errorHandler(res, "Error");
        } catch (error) {
            next(error);
        }
    }
}