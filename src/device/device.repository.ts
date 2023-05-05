import { Device } from "./device.types";


export class DeviceRepository {
    model: any;

    constructor(model: any) {
        this.model = model;
    }

    async getTestDevices(): Promise<Device[]> {
        return [
            {
                id: '1',
                vendor: 'Device 1',
                status: true,
                date: new Date(),
                gateway: '9687454354',
            },
            {
                id: '2',
                vendor: 'Device 1',
                status: true,
                date: new Date(),
                gateway: '9687454354',
            },
        ];
    };

    // async 
}