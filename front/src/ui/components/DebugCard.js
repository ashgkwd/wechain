import { Button, Card, Input } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import Service from "../../Service";
import { createOnChange } from "../../Util";

const StyledDebugCard = styled(Card)`
  margin-top: 1rem;
  background-color: skyblue;
`;

export default function DebugCard() {
  const [index, setIndex] = useState([]);

  const onIndexChange = createOnChange(setIndex);

  function onTypeClick() {
    Service.getJurStatusTypes(index).catch(err => {
      console.error("failed to get jur status types", err);
    });
  }

  function onCountClick() {
    return Service.getJurStatusCount();
  }

  return (
    <StyledDebugCard title="Debug Card (F12 for console)">
      <p>
        <Input onChange={onIndexChange} placeholder="Index (defaults to 0)" />
      </p>
      <p>
        <Button onClick={onTypeClick}>Get Jur Status Types</Button>
      </p>
      <p>
        <Button onClick={onCountClick}>Get Jur Status Count</Button>
      </p>
    </StyledDebugCard>
  );
}
