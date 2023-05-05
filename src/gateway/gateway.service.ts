import { BaseService } from "../common/baseClasses/baseService";
import { GatewayRepository } from "./gateway.repository";
import { Gateway } from "./gateway.types";


export class GatewayService extends BaseService<GatewayRepository>{
    constructor(
        private gatewayRepository: GatewayRepository,
    ) { 
        super(gatewayRepository);
    }

    async getGateway(id: string): Promise<Gateway> {
        return await this.gatewayRepository.getGatewayById(id);
    }

    async getGateways(): Promise<Gateway[]> {
        return await this.gatewayRepository.getTestGateways();
    }

    async getGatewaysWithDevices(): Promise<Gateway[]> {
        return await this.gatewayRepository.getGatewaysWithDevices();
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