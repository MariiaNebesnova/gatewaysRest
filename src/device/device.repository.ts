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

    async ediDevice(device: Partial<Device>): Promise<Device> {
        const { _id, ...rest } = device;
        console.log(_id, rest);
        await this.model.findOneAndUpdate({ _id }, rest).exec();
        return this.model.findById(_id).exec();
    }

    async createDevice(device: Device, gatewayId: string): Promise<any> {
        // a transaction should be here, but I can't set up a replica set for that
        try {
            const gateway = await this.gatewayRepository.getGatewayById(gatewayId);
            if (gateway.devices.length >= 10) throw new Error("A gateway can't have more than 10 devices");

            const newDevice = await this.model.create([device]);
            gateway.devices.push(newDevice[0]._id);
            await gateway.save();
            return newDevice;
        } catch (error) {
            throw error;
        }

    };

    async removeDevice(deviceId: string, gatewayId?: string): Promise<any> {
        // a transaction should be here, but I can't set up a replica set for that
        console.log(deviceId, gatewayId);
        try {
            await this.model.findByIdAndDelete(deviceId);
            
            if (!gatewayId) return "device removed";
            const gateway = await this.gatewayRepository.getGatewayById(gatewayId);
            gateway.devices = gateway.devices.filter((id: string) => id !== deviceId);
            await gateway.save();
            return "device deleted and removed from gateway";
        } catch (error) {
            throw error;
        }
    };
}