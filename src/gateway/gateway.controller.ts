import { NextFunction, Request, Response, Router } from "express";
import { BaseController } from "../common/baseClasses/baseController";
import { GatewayService } from "./gateway.service";

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
        // this.router.post('/', this.createGateway);
        // this.router.put('/', this.updateGateway);
        // this.router.delete('/:id', this.deleteGateway);
    }

    async getGateways (req: Request, res: Response, next: NextFunction) {
        try {
            const gateways = await this.service.getGateways();
            res.status(200).json(gateways);
        } catch (error) {
            next(error);
        }
    }

    async getGateway (req: Request, res: Response, next: NextFunction) {
        try {
            const gateway = await this.service.getGateway(req.params.id);
            res.status(200).json(gateway);
        } catch (error) {
            next(error);
        }
    }
}