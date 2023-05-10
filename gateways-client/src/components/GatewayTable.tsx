import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { Badge, Dropdown, Space, Table, Typography } from 'antd';
import { Gateway, Device } from '../common/types';

const { Text, Link } = Typography;

interface Props {
    gateways?: Gateway[];
}

export const GatewayTable: React.FC<Props> = ({ gateways }) => {
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
                        {!device.status && <Link>Run</Link>}
                        {device.status && <Link>Stop</Link>}
                        <Link type="danger">Remove</Link>
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
                    <Link>Add device</Link>
                    <Link type="danger">Remove Gateway</Link>
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
