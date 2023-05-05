import { DataBase } from "../common/db";
import { GatewayRepository } from "../gateway/gateway.repository";
import { Device } from "./device.types";


export class DeviceRepository {
    model: any;
    gatewayRepository: GatewayRepository;

    constructor(model: any, gatewayRepository: GatewayRepository) {
        this.model = model;
        this.gatewayRepository = gatewayRepository;
    }

    async getDevices(gatewayId: any): Promise<Device[]> {
        return await this.model.find(gatewayId && gatewayId.length ? { gatewayId } : {}).exec();
        // return await this.model.find({ });
    };

    async getDevicesByGatewayId(id: string): Promise<Device[]> {
        return await this.model.find({ gateway_id: id });
    };

    async createDevice(device: Device, gatewayId: string): Promise<any> {
        const session = await DataBase.db.startSession();
        session.startTransaction();

        try {
            const newDevice = await this.model.create([device]);

            const gateway = await this.gatewayRepository.getGatewayById(gatewayId);
            gateway.devices.push(newDevice[0]._id);
            await gateway.save();

            await session.commitTransaction();
            session.endSession();
            return newDevice[0];
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    };

    // async 
}