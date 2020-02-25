import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Spin,
  List,
  Switch,
  message
} from "antd";
import Service from "../../Service";

const StyledDebugCard = styled(Card)`
  margin-top: 1rem;
  background-color: skyblue;
`;

function DebugCard() {
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

function CreateJurStatusType() {
  const [inTransaction, setInTransaction] = useState(false);
  const [name, setName] = useState("");

  function onNameChange(e) {
    setName(e.target.value);
  }

  function createJurStatusType() {
    console.log("about to create jur status type", name);
    setInTransaction(true);
    return Service.createJurStatusType(name)
      .then(() => {
        message.success("Created Jur Status Type");
        setInTransaction(false);
      })
      .catch(() => {
        message.error("Failed to create Jur Status Type");
        setInTransaction(false);
      });
  }

  return (
    <>
      <Card title="Create Jur Status Type">
        <p>
          <Input placeholder="Name A Jur Type" onChange={onNameChange} />
        </p>
        <Button onClick={createJurStatusType} disabled={inTransaction}>
          {inTransaction ? (
            <span>
              <Spin size="small" /> &emsp; Creating
            </span>
          ) : (
            "Create Jur Type"
          )}
        </Button>
      </Card>
      <DebugCard></DebugCard>
    </>
  );
}

function CreateJurStatus() {
  const [inTransaction, setInTransaction] = useState(false);
  const [address, setAddress] = useState("");

  function onAddressChange(e) {
    setAddress(e.target.value);
  }

  const [type, setType] = useState(0);

  function onTypeChange(e) {
    setType(e.target.value);
  }

  function createJurStatus() {
    setInTransaction(true);
    return Service.createJurStatus(address, type)
      .then(() => {
        message.success("Created Jur Status");
        setInTransaction(false);
      })
      .catch(() => {
        message.error("Failed to create Jur Status");
        setInTransaction(false);
      });
  }

  return (
    <Card title="Create Jur Status">
      <p>
        <Input placeholder="Address" onChange={onAddressChange} />
      </p>
      <p>
        <Input placeholder="Jur Status Type" onChange={onTypeChange} />
      </p>
      <Button onClick={createJurStatus} disabled={inTransaction}>
        {inTransaction ? (
          <span>
            <Spin size="small" /> &emsp; Creating
          </span>
        ) : (
          "Create Jur Status"
        )}
      </Button>
    </Card>
  );
}

function JurStatusState() {
  const [inTransaction, setInTransaction] = useState(false);
  const [address, setAddress] = useState("");

  function onAddressChange(e) {
    setAddress(e.target.value);
  }

  const [state, setState] = useState(0);

  function onStateChange(value) {
    console.log("switch status", value);
    setState(value ? 1 : 0);
  }

  function changeJurStatus() {
    setInTransaction(true);
    return Service.changeJurStatus(address, state)
      .then(() => {
        message.success("Changed Jur Status");
        setInTransaction(false);
      })
      .catch(() => {
        message.error("Failed to create Jur Status");
        setInTransaction(false);
      });
  }

  return (
    <Card title="Change Jur Status State">
      <p>
        <Input placeholder="Address" onChange={onAddressChange} />
      </p>
      <p>
        <Switch
          onChange={onStateChange}
          checkedChildren="✔️"
          unCheckedChildren="❌"
        />
      </p>
      <Button onClick={changeJurStatus} disabled={inTransaction}>
        {inTransaction ? (
          <span>
            <Spin size="small" /> &emsp; Changing
          </span>
        ) : (
          "Change State"
        )}
      </Button>
    </Card>
  );
}

function JurStatusScreen() {
  return (
    <Row type="flex" justify="space-around">
      <Col span={8}>
        <CreateJurStatusType />
      </Col>
      <Col span={6}>
        <CreateJurStatus />
      </Col>
      <Col span={6}>
        <JurStatusState />
      </Col>
    </Row>
  );
}

export default JurStatusScreen;
