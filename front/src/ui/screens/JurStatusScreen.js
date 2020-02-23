import React, { useState, useEffect } from "react";
import { Card, Row, Col, Input, Button, Spin, List, Switch } from "antd";
import Service from "../../Service";

function JurStatusTypeList() {
  const [types, setTypes] = useState([]);

  // useEffect(() => {
  //   Service.getJurStatusTypes().catch(err => {
  //     console.error("failed to get jur status types", err);
  //   });
  // });
  useEffect(() => {
    console.log("got owner account", Service.getOwnerAccount());
    // .then(res => console.log("oener acc", res)).catch(err => console.error("failed owner acc"))
  });

  return (
    <List>
      {types.map((s, i) => (
        <List.Item key={i}>{s}</List.Item>
      ))}
    </List>
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
    console.log("got owner account", Service.getOwnerAccount());
    setInTransaction(true);
    return Service.createJurStatusType(name)
      .then(() => {
        setInTransaction(false);
      })
      .catch(() => {
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
      .then(() => setInTransaction(false))
      .catch(() => setInTransaction(false));
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
      .then(() => setInTransaction(false))
      .catch(() => setInTransaction(false));
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
