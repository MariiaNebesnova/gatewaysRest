import { Gateway } from "./gateway.types";


export class GatewayRepository {
    model: any;

    constructor(model: any) {
        this.model = model;
    }

    async getTestGateways(): Promise<Gateway[]> {
        return await this.model.find();
    };

    async getGatewayById(id: string): Promise<Gateway> {
        return await this.model.findById(id);
    };

}