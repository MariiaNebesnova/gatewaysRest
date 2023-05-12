const gatewaysName = "gateways";
const devicesName = "devices";

const gatewaysCollection = db.getCollection(gatewaysName);
const devicesCollection = db.getCollection(devicesName);

const devices = [
  { uid: '001', vendor: 'Vendor A', date: new Date('2023-05-01'), status: true },
  { uid: '002', vendor: 'Vendor B', date: new Date('2023-05-02'), status: false },
  { uid: '003', vendor: 'Vendor C', date: new Date('2023-05-03'), status: true },
  { uid: '004', vendor: 'Vendor D', date: new Date('2023-05-04'), status: false },
];

const devicesresult = devicesCollection.insertMany(devices);
const deviceIds = devicesresult.insertedIds;

const gateways = [
  { serialNumber: 'SN001', name: 'Gateway 1', ipv4: '192.168.1.1', devices: [deviceIds[0], deviceIds[1], deviceIds[2]] },
  { serialNumber: 'SN002', name: 'Gateway 2', ipv4: '192.168.1.2', devices: [deviceIds[3]] },
  { serialNumber: 'SN003', name: 'Gateway 3', ipv4: '192.168.1.3' },
  { serialNumber: 'SN004', name: 'Gateway 4', ipv4: '192.168.1.4' },
  { serialNumber: 'SN005', name: 'Gateway 5', ipv4: '192.168.1.5' },
];

gatewaysCollection.insertMany(gateways);

print(`Inserted ${devicesCollection.count()} documents into ${devicesName}`);
