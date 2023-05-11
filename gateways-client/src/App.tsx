import React, { useEffect } from 'react';
import { GatewayTable } from './components/GatewayTable';
import { Button, Row, Typography } from 'antd';
import { GatewayForm } from './components/GatewayForm';
import { DeviceForm } from './components/DeviceForm';
import { fetchGet } from './common/fetchHelpers';

const { Title } = Typography;

export const App = () => {
  const [gateways, setGateways] = React.useState();
  const [isGtwModalOpen, setIsGtwModalOpen] = React.useState(false);
  const [isDevModalOpen, setIsDevModalOpen] = React.useState(false);
  const [gatewayId, setGatewayId] = React.useState(''); // for device modal form

  useEffect(() => {
    fetchGet('/gateways')
      .then(response => response.json())
      .then(data => setGateways(data));
  }, []);

  const openDeviceForm = (gatewayId: string) => {
    setGatewayId(gatewayId);
    setIsDevModalOpen(true);
  };

  return (
    <div>
      <Row justify="center">
        <Title>Gateways</Title>
      </Row>
      <Row align="middle" justify="center">
        <Button type="primary" style={{ marginBottom: "24px" }} onClick={() => setIsGtwModalOpen(!isGtwModalOpen)}>Add Gateway</Button>
      </Row>
      <GatewayTable {...{ gateways, openDeviceForm }} />
      <GatewayForm {...{ isModalOpen: isGtwModalOpen, setIsModalOpen: setIsGtwModalOpen }} />
      <DeviceForm {...{ isModalOpen: isDevModalOpen, setIsModalOpen: setIsDevModalOpen, gatewayId }} />
    </div>
  );
}
