import { Layout, Radio } from "antd";
import React from "react";
import styled from "styled-components";

const { Header } = Layout;

const Title = styled.span`
  color: white;
  padding-right: 1rem;
`;

function AppHeader({ screen, onScreenChange }) {
  return (
    <Header>
      <Title>WeChain</Title>

      <Radio.Group value={screen} onChange={onScreenChange}>
        <Radio.Button value="transfer">Transfer</Radio.Button>
        <Radio.Button value="jur-status">Jur Status</Radio.Button>
      </Radio.Group>
    </Header>
  );
}

export default AppHeader;
