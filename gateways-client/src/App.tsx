import React, { useEffect } from 'react';
import { GatewayTable } from './components/GatewayTable';
import { Button, Row, Typography } from 'antd';

const { Title } = Typography;

export const App = () => {

  const [gateways, setGateways] = React.useState();

  useEffect(() => {
    fetch('/gateways')
      .then(response => response.json())
      .then(data => setGateways(data));
  }, []);

  return (
    <div>
      <Row justify="center">
        <Title>Gateways</Title>
      </Row>
      <Row align="middle" justify="center">
        <Button type="primary" style={{ marginBottom: "24px" }}>Add Gateway</Button>
      </Row>
      <GatewayTable {...{ gateways }} />
    </div>
  );
}
