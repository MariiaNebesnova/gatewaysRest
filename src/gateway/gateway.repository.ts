import { DBQuery } from "../common/db";
import { Gateway } from "./gateway.types";


export class GatewayRepository {
    model: any;

    constructor(model: any) {
        this.model = model;
    }

    async getTestGateways(): Promise<Gateway[]> {
        return await this.model.find().populate('devices');
    };

    async getGatewayById(id: string): Promise<any> {
        return await this.model.findById(id).populate('devices');
    };

    async getGatewaysWithDevices(): Promise<Gateway[]> {
        return await this.model.find().populate('devices');
    };

}