import React from "react";
import { Card, Row, Col } from "antd";

function CreateJurType() {
  return <Card title="Create Jur Type"></Card>;
}

function CreateJur() {
  return <Card title="Create Jur"></Card>;
}

function JurList() {
  return <Card title="Your Jurs"></Card>;
}

function JurStatusScreen() {
  return (
    <Row type="flex" justify="space-around">
      <Col span={8}>
        <CreateJurType />
      </Col>
      <Col span={6}>
        <CreateJur />
      </Col>
      <Col span={6}>
        <JurList />
      </Col>
    </Row>
  );
}

export default JurStatusScreen;
