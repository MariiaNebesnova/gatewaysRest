import React from 'react';
import { TableColumnsType } from 'antd';
import { Badge, Space, Table, Typography } from 'antd';
import { Gateway, Device } from '../common/types';
import { removeDeviceHandler, removeGatewayHandler, runDeviceHandler, stopDeviceHandler } from './gatewayTable.utils';

const { Link } = Typography;

interface Props {
    gateways?: Gateway[];
    openDeviceForm: (gatewayId: string) => void;
    dispatch: (action: any) => void;
}

export const GatewayTable: React.FC<Props> = ({ gateways, openDeviceForm, dispatch }) => {
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
                        {!device.status && <Link onClick={runDeviceHandler(device._id, gateway._id, dispatch)}>Run</Link>}
                        {device.status && <Link onClick={stopDeviceHandler(device._id, gateway._id, dispatch)}>Stop</Link>}
                        <Link type="danger" onClick={removeDeviceHandler(device._id, gateway._id, dispatch)}>Remove</Link>
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
                    <Link disabled={ gateway.devices.length >= 10 } onClick={() => openDeviceForm(gateway._id)}>Add device</Link>
                    <Link type="danger" onClick={removeGatewayHandler(gateway._id, dispatch)}>Remove Gateway</Link>
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
