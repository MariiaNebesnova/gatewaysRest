import { NextFunction, Request, Response, Router } from "express";
import { BaseController } from "../common/baseClasses/baseController";
import { GatewayService } from "./gateway.service";
import { newGatewaySchema } from "./utils/gatewayValidation";
import { validateSchema } from "../common/validateSchema.middleware";

export class GatewayController extends BaseController<GatewayService> {
    constructor(
        router: Router,
        gatewayService: GatewayService,
    ) {
        super(router, gatewayService);
    }

    initRoutes(): void {
        // this.router.get('/gateways', this.getGateways.bind(this));
        this.router.get('/gateways', this.getGateways.bind(this));
        this.router.get('/gateways/:id', this.getGateway.bind(this));
        this.router.post('/gateways/new', validateSchema(newGatewaySchema), this.createGateway.bind(this));
        // this.router.put('/', this.updateGateway);
        // this.router.delete('/:id', this.deleteGateway);
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
}