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
    };

    async getDevicesByGatewayId(id: string): Promise<Device[]> {
        return await this.model.find({ gateway_id: id });
    };

    async createDevice(device: Device, gatewayId: string): Promise<any> {
        // a transaction should be here, but I can't set up a replica set for that
        try {
            const newDevice = await this.model.create([device]);
            const gateway = await this.gatewayRepository.getGatewayById(gatewayId);
            gateway.devices.push(newDevice[0]._id);
            await gateway.save();
            return newDevice;
        } catch (error) {
            throw error;
        }

    };

    async removeDevice(deviceId: string, gatewayId: string): Promise<any> {
        // a transaction should be here, but I can't set up a replica set for that
        try {
            const device = await this.model.findById(deviceId);
            const gateway = await this.gatewayRepository.getGatewayById(gatewayId);
            gateway.devices = gateway.devices.filter((id: string) => id !== deviceId);
            await gateway.save();
            await device.remove();
            return "device removed";
        } catch (error) {
            throw error;
        }
    };
}