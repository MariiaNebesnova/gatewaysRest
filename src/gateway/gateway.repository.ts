import { Gateway } from "./gateway.types";


export class GatewayRepository {
    model: any;

    constructor(model: any) {
        this.model = model;
    }

    async getGatewayById(id: string): Promise<any> {
        return await this.model.findById(id).populate('devices');
    };

    async getGateways(): Promise<Gateway[]> {
        return await this.model.find().populate('devices');
    };

    async createGateway(gateway: Gateway): Promise<Gateway> {
        return await this.model.create(gateway);
    };

    async removeGateway(id: string): Promise<any> {
        const gateway = await this.model.findByIdAndDelete(id);

        gateway.devices.forEach(async (deviceId: string) => {
            await this.model.db.model('Device').findByIdAndDelete(deviceId);
        });

        return "gateway removed";
    };
}