import { NextFunction, Request, Response, Router } from "express";
import { BaseController } from "../common/baseClasses/baseController";
import { DeviceService } from "./device.service";
import { validateSchema } from "../common/validateSchema.middleware";
import { newDeviceSchema, switchStatusSchema } from "./utils/deviceValidation";
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
        this.router.post(
            '/devices/new',
            validateSchema(newDeviceSchema),
            this.createDevice.bind(this),
            methodErrorLogger("createDevice")
        );
        this.router.put(
            '/devices/statusOn',
            validateSchema(switchStatusSchema),
            this.deviceStatusOn.bind(this),
            methodErrorLogger("deviceStatusOn")
        );
        this.router.put(
            '/devices/statusOff',
            validateSchema(switchStatusSchema),
            this.deviceStatusOff.bind(this),
            methodErrorLogger("deviceStatusOff")
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

    async deviceStatusOn(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.service.deviceStatusOn(req.body);
            console.log(result);
            if (result) this.successHandler(res, result);
            else this.errorHandler(res, "Error");
        } catch (error) {
            next(error);
        }
    }

    async deviceStatusOff(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.service.deviceStatusOff(req.body);
            if (result) this.successHandler(res, result);
            else this.errorHandler(res, "Error");
        } catch (error) {
            next(error);
        }
    }
}