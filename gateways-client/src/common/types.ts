export interface Gateway {
    name: string;
    serialNumber: string;
    ipv4: string;
    devices: Device[];
}

export interface Device {
    uid: string;
    vendor: string;
    date: string;
    status: string;
}