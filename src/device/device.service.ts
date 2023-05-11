import { BaseService } from "../common/baseClasses/baseService";
import { DeviceRepository } from "./device.repository";
import { Device } from "./device.types";


export class DeviceService extends BaseService<DeviceRepository>{
    constructor(
        private deviceRepository: DeviceRepository,
    ) { 
        super(deviceRepository);
    }

    async getDevices(gatewayId: any): Promise<Device[]> {
        return await this.deviceRepository.getDevices(gatewayId);
    }

    async createDevice({device, gatewayId}: { device: Device, gatewayId: string }): Promise<Device> {
        return await this.deviceRepository.createDevice(device, gatewayId);
    }

    async deviceStatusOn({_id}: {_id: string}): Promise<Device> {
        return await this.deviceRepository.ediDevice({ _id, status: true });
    }

    async deviceStatusOff({_id}: {_id: string}): Promise<Device> {
        return await this.deviceRepository.ediDevice({ _id, status: false });
    }

    async removeDevice({deviceId, gatewayId}: {deviceId: string, gatewayId: string}): Promise<any> {
        return await this.deviceRepository.removeDevice(deviceId, gatewayId);
    }
}