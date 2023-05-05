import express from "express";
import { DataBase } from "./db";
import { Gateway } from "../gateway/gateway.model";
import { GatewayRepository } from "../gateway/gateway.repository";
import { GatewayService } from "../gateway/gateway.service";
import { GatewayController } from "../gateway/gateway.controller";

export const bindRoutes = (db: DataBase) => {
    const router = express.Router();

    const gatewayModel = new Gateway(db).model;
    const gatewayRepo = new GatewayRepository(gatewayModel);
    const gatewayService = new GatewayService(gatewayRepo);
    new GatewayController(router, gatewayService);
    
    return router;
}