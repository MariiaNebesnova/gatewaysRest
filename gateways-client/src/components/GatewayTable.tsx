import React from 'react';
import { TableColumnsType, notification } from 'antd';
import { Badge, Space, Table, Typography } from 'antd';
import { Gateway, Device } from '../common/types';
import { fetchDelete, fetchPost, fetchPut } from '../common/fetchHelpers';
import { REMOVE_DEVICE, REMOVE_GATEWAY, RUN_DEVICE, STOP_DEVICE } from '../app/state';

const { Link } = Typography;

interface Props {
    gateways?: Gateway[];
    openDeviceForm: (gatewayId: string) => void;
    dispatch: (action: any) => void;
}

export const GatewayTable: React.FC<Props> = ({ gateways, openDeviceForm, dispatch }) => {
    const runDeviceHandler = (deviceId: string, gatewayId: string) => () => {
        notification.info({ message: "Running device..." });
        fetchPut("/devices/statusOn", { _id: deviceId })
            .then((response) => {
                if (response.ok) {
                    dispatch({ type: RUN_DEVICE, payload: { deviceId, gatewayId }});
                    notification.success({ message: "Device runned!" });
                } else {
                    notification.error({ message: "Something went wrong..." });
                }
            });
    }

    const stopDeviceHandler = (deviceId: string, gatewayId: string) => () => {
        notification.info({ message: "Stopping device..." });
        fetchPut("/devices/statusOff", { _id: deviceId })
            .then((response) => {
                if (response.ok) {
                    dispatch({ type: STOP_DEVICE, payload: { deviceId, gatewayId }});
                    notification.success({ message: "Device stopped!" });
                } else {
                    notification.error({ message: "Something went wrong..." });
                }
            });
    }

    const removeDeviceHandler = (deviceId: string, gatewayId: string) => () => {
        notification.info({ message: "Removing device..." });
        fetchPost("/devices/remove", { deviceId, gatewayId })
            .then((response) => {
                if (response.ok) {
                    dispatch({ type: REMOVE_DEVICE, payload: { deviceId, gatewayId }});
                    notification.success({ message: "Device removed!" });
                } else {
                    notification.error({ message: "Something went wrong..." });
                }
            });
    }

    const removeGatewayHandler = (gatewayId: string) => () => {
        notification.info({ message: "Removing gateway..." });
        fetchDelete("/gateways/remove", gatewayId)
            .then((response) => {
                if (response.ok) {
                    dispatch({ type: REMOVE_GATEWAY, payload: gatewayId });
                    notification.success({ message: "Gateway removed!" });
                } else {
                    notification.error({ message: "Something went wrong..." });
                }
            });
    }

    const expandedRowRender = (gateway: Gateway) => {
        const columnsDevice: TableColumnsType<Device> = [
            { title: 'UID', dataIndex: 'uid', key: 'uid' },
            { title: 'Vendor', dataIndex: 'vendor', key: 'vendor' },
            { title: 'Date', dataIndex: 'date', key: 'date' },
            {
                title: 'Status',
                key: 'status',
                render: (device) => (<Badge status={device.status ? "success" : "error"} />),
            },
            {
                title: 'Action',
                key: 'action',
                render: (device) => (
                    <Space size="middle">
                        {!device.status && <Link onClick={runDeviceHandler(device._id, gateway._id)}>Run</Link>}
                        {device.status && <Link onClick={stopDeviceHandler(device._id, gateway._id)}>Stop</Link>}
                        <Link type="danger" onClick={removeDeviceHandler(device._id, gateway._id)}>Remove</Link>
                    </Space>
                ),
            },
        ];

        return <Table columns={columnsDevice} dataSource={gateway.devices.map((device, index) => ({ key: index.toString(), ...device }))} pagination={false} />;
    };

    const columns: TableColumnsType<Gateway> = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Serial number', dataIndex: 'serialNumber', key: 'serialNumber' },
        { title: 'IPv4', dataIndex: 'ipv4', key: 'ipv4' },
        { title: 'Devices', key: 'devices', render: (gateway: Gateway) => gateway.devices.length },
        {
            title: 'Action',
            key: 'operation',
            render: (gateway) => (
                <Space>
                    <Link onClick={() => openDeviceForm(gateway._id)}>Add device</Link>
                    <Link type="danger" onClick={removeGatewayHandler(gateway._id)}>Remove Gateway</Link>
                </Space>
            )
        },
    ];

    return (
        <>
            {
                gateways && <Table
                    columns={columns}
                    expandable={{ expandedRowRender }}
                    dataSource={gateways.map((gateway, index) => {
                        return {
                            key: index.toString(),
                            ...gateway,
                        };
                    })
                    }
                    pagination={false}
                />
            }

        </>
    );
};
