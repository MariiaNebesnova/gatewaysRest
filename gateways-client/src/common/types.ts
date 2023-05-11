export interface Gateway {
    _id: string;
    name: string;
    serialNumber: string;
    ipv4: string;
    devices: Device[];
}

export interface Device {
    _id: string;
    uid: string;
    vendor: string;
    date: string;
    status: string;
}