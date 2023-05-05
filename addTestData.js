const dbName = "gatewaydb";
const gatewaysName = "gateways";
const devicesName = "device";

const db = conn.getDB(dbName);

const gatewaysCollection = db.getCollection(gatewaysName);
const devicesCollection = db.getCollection(devicesName);

const gateways = [
  { serialNumber: 'SN001', name: 'Gateway 1', ipv4: '192.168.1.1' },
  { serialNumber: 'SN002', name: 'Gateway 2', ipv4: '192.168.1.2' },
  { serialNumber: 'SN003', name: 'Gateway 3', ipv4: '192.168.1.3' },
  { serialNumber: 'SN004', name: 'Gateway 4', ipv4: '192.168.1.4' },
  { serialNumber: 'SN005', name: 'Gateway 5', ipv4: '192.168.1.5' },
];

const gatewaysResult = gatewaysCollection.insertMany(gateways);

const gatewayIds = gatewaysResult.insertedIds;

const devices = [
  { uid: '001', vendor: 'Vendor A', date: new Date('2023-05-01'), status: true, gateway_id: gatewayIds[0] },
  { uid: '002', vendor: 'Vendor B', date: new Date('2023-05-02'), status: false, gateway_id: gatewayIds[0] },
  { uid: '003', vendor: 'Vendor C', date: new Date('2023-05-03'), status: true, gateway_id: gatewayIds[0] },
  { uid: '004', vendor: 'Vendor D', date: new Date('2023-05-04'), status: false, gateway_id: gatewayIds[1] },
];

devicesCollection.insertMany(devices);

print(`Inserted ${devicesCollection.count()} documents into ${devicesName}`);
