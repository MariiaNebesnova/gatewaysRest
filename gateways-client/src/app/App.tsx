import React, { useEffect, useReducer } from 'react';
import { GatewayTable } from '../gateways/GatewayTable';
import { Button, Row, Typography } from 'antd';
import { GatewayForm } from '../gateways/GatewayForm';
import { DeviceForm } from '../devices/DeviceForm';
import { fetchGet } from '../common/fetchHelpers';
import { ADD_GATEWAYS, initialAppState, reducer } from './state';

const { Title } = Typography;

export const App = () => {
  // state is shared between components by props drilling, becase there's a very simple component tree
  const [state, dispatch] = useReducer(reducer, initialAppState);
  const gateways = state.gateways;
  const [isGtwModalOpen, setIsGtwModalOpen] = React.useState(false);
  const [isDevModalOpen, setIsDevModalOpen] = React.useState(false);
  const [gatewayId, setGatewayId] = React.useState(''); // for device modal form

  useEffect(() => {
    fetchGet('/gateways')
      .then(response => response.json())
      .then(data => dispatch({ type: ADD_GATEWAYS, payload: data }));
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
      <GatewayTable {...{ gateways, openDeviceForm, dispatch }} />
      <GatewayForm {...{ isModalOpen: isGtwModalOpen, setIsModalOpen: setIsGtwModalOpen, dispatch }} />
      <DeviceForm {...{ isModalOpen: isDevModalOpen, setIsModalOpen: setIsDevModalOpen, gatewayId, dispatch }} />
    </div>
  );
}
