import React, { useState, useEffect } from "react";
import { Card, Row, Col, Input, Button, Spin, List } from "antd";
import Service from "../../Service";

function JurStatusTypeList() {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    Service.getJurStatusTypes()
      .then(setTypes)
      .catch(err => {
        console.error("failed to get jur status types", err);
      });
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
    setInTransaction(true);
    return Service.getJurStatusContract()
      .methods.addStatusType(name)
      .send({ from: Service.getOwnerAddress(), gas: 100000 })
      .then(res => {
        console.log("added status type", res);
        setInTransaction(false);
      })
      .catch(err => {
        console.error("failed to add status type", err);
        setInTransaction(false);
      });
  }

  return (
    <>
      <Card title="Create Jur Type">
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
      <JurStatusTypeList />
    </>
  );
}

function CreateJurStatus() {
  return <Card title="Create Jur"></Card>;
}

function JurStatusList() {
  return <Card title="Your Jurs"></Card>;
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
        <JurStatusList />
      </Col>
    </Row>
  );
}

export default JurStatusScreen;
