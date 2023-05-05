import express from "express";
import { DataBase } from "./db";
import { Gateway } from "../gateway/gateway.model";
import { GatewayRepository } from "../gateway/gateway.repository";
import { GatewayService } from "../gateway/gateway.service";
import { GatewayController } from "../gateway/gateway.controller";
import { Device } from "../device/device.model";
import { DeviceRepository } from "../device/device.repository";
import { DeviceService } from "../device/device.service";
import { DeviceController } from "../device/device.controller";

export const bindRoutes = (db: DataBase) => {
    const router = express.Router();

    const gatewayModel = new Gateway(db).model;
    const gatewayRepo = new GatewayRepository(gatewayModel);
    const gatewayService = new GatewayService(gatewayRepo);
    new GatewayController(router, gatewayService);

    const deviceModel = new Device(db).model;
    const deviceRepo = new DeviceRepository(deviceModel, gatewayRepo);
    const deviceService = new DeviceService(deviceRepo);
    new DeviceController(router, deviceService);
    
    return router;
}