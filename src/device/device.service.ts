import { BaseService } from "../common/baseClasses/baseService";
import { DeviceRepository } from "./device.repository";
import { Device } from "./device.types";


export class DeviceService extends BaseService<DeviceRepository>{
    constructor(
        private deviceRepository: DeviceRepository,
    ) { 
        super(deviceRepository);
    }

    // async getGateway(id: string): Promise<Gateway> {
    //     return await this.gatewayRepository.getGateway(id);
    // }

    async getDevices(gatewayId: any): Promise<Device[]> {
        return await this.deviceRepository.getDevices(gatewayId);
    }

    async getDevicesByGatewayId(id: string): Promise<Device[]> {
        return await this.deviceRepository.getDevicesByGatewayId(id);
    }

    async createDevice({device, gatewayId}: { device: Device, gatewayId: string }): Promise<Device> {
        return await this.deviceRepository.createDevice(device, gatewayId);
    }

    // async createGateway(gateway: Gateway): Promise<Gateway> {
    //     return await this.gatewayRepository.createGateway(gateway);
    // }

    // async updateGateway(gateway: Gateway): Promise<Gateway> {
    //     return await this.gatewayRepository.updateGateway(gateway);
    // }

    // async deleteGateway(id: string): Promise<void> {
    //     return await this.gatewayRepository.deleteGateway(id);
    // }
}