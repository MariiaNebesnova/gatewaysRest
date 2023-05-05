import { NextFunction, Request, Response, Router } from "express";
import { BaseController } from "../common/baseClasses/baseController";
import { DeviceService } from "./device.service";

export class DeviceController extends BaseController<DeviceService> {
    constructor(
        router: Router,
        deviceService: DeviceService,
    ) {
        super(router, deviceService);
    }

    initRoutes(): void {
        this.router.get('/', this.getDevices.bind(this));
        // this.router.get('/:id', this.getGateway);
        // this.router.post('/', this.createGateway);
        // this.router.put('/', this.updateGateway);
        // this.router.delete('/:id', this.deleteGateway);
    }

    async getDevices (req: Request, res: Response, next: NextFunction) {
        try {
            const devices = await this.service.getDevices();
            res.status(200).json(devices);
        } catch (error) {
            next(error);
        }
    }
}