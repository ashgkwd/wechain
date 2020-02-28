import { Button, Card, Input } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import Service from "../../Service";

const StyledDebugCard = styled(Card)`
  margin-top: 1rem;
  background-color: skyblue;
`;

export default function DebugCard() {
  const [index, setIndex] = useState([]);

  function onIndexChange(e) {
    setIndex(e.target.value);
  }

  function onGetStatusTypeClick() {
    Service.getJurStatusTypes(index).catch(err => {
      console.error("failed to get jur status types", err);
    });
  }

  return (
    <StyledDebugCard title="Debug Card (F12 for console)">
      <p>
        <Input onChange={onIndexChange} placeholder="Index (defaults to 0)" />
      </p>
      <Button onClick={onGetStatusTypeClick}>Get Jur Status Types</Button>
    </StyledDebugCard>
  );
}
