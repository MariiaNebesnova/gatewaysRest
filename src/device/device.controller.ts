import { NextFunction, Request, Response, Router } from "express";
import { BaseController } from "../common/baseClasses/baseController";
import { DeviceService } from "./device.service";
import { validateSchema } from "../common/validateSchema.middleware";
import { newDeviceSchema } from "./utils/deviceValidation";
import { methodErrorLogger } from "../common/logger.middleware";

export class DeviceController extends BaseController<DeviceService> {
    constructor(
        router: Router,
        deviceService: DeviceService,
    ) {
        super(router, deviceService);
    }

    initRoutes(): void {
        this.router.get('/devices', this.getDevices.bind(this));
        this.router.get(
            '/devicesGateway/:id',
            this.getDevicesByGatewayId.bind(this)
        );
        this.router.post(
            '/devices/new',
            validateSchema(newDeviceSchema),
            this.createDevice.bind(this),
            methodErrorLogger("createDevice")
        );
    }

    async getDevices(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.service.getDevices(req.query.gatewayId);
            if (result) this.successHandler(res, result);
            else this.errorHandler(res, "No devices found");
        } catch (error) {
            next(error);
        }
    }

    async getDevicesByGatewayId(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.service.getDevicesByGatewayId(req.params.id);
            if (result) this.successHandler(res, result);
            else this.errorHandler(res, "Error");
        } catch (error) {
            next(error);
        }
    }

    async createDevice(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.service.createDevice(req.body);
            console.log(result);
            if (result) this.successHandler(res, result);
            else this.errorHandler(res, "Error");
        } catch (error) {
            next(error);
        }
    }
}