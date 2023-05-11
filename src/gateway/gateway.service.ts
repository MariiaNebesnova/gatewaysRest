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
        return await this.gatewayRepository.getGateways();
    }

    async createGateway(gateway: Gateway): Promise<Gateway> {
        return await this.gatewayRepository.createGateway(gateway);
    }

    async removeGateway(id: string): Promise<any> {
        return await this.gatewayRepository.removeGateway(id);
    }
}