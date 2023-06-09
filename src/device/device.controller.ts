import { NextFunction, Request, Response, Router } from "express";
import { BaseController } from "../common/baseClasses/baseController";
import { DeviceService } from "./device.service";
import { validateBody } from "../common/validateSchema.middleware";
import { newDeviceSchema, removeDeviceSchema, switchStatusSchema } from "./utils/deviceValidation";

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
            validateBody(newDeviceSchema),
            this.createDevice.bind(this),
        );
        this.router.post( // because I need body
            '/devices/remove',
            validateBody(removeDeviceSchema),
            this.removeDevice.bind(this),
        );
        this.router.put(
            '/devices/statusOn',
            validateBody(switchStatusSchema),
            this.deviceStatusOn.bind(this),
        );
        this.router.put(
            '/devices/statusOff',
            validateBody(switchStatusSchema),
            this.deviceStatusOff.bind(this),
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
            if (result) this.successHandler(res, result);
            else this.errorHandler(res, "Error");
        } catch (error) {
            next(error);
        }
    }

    async removeDevice(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.service.removeDevice(req.body);
            if (result) this.successHandler(res, result);
            else this.errorHandler(res, "Error");
        } catch (error) {
            next(error);
        }
    }

    async deviceStatusOn(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.service.deviceStatusOn(req.body);
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