import { Col, Row } from "antd";
import React from "react";
import CreateJurStatus from "./components/CreateJurStatus";
import CreateJurStatusType from "./components/CreateJurStatusType";
import JurStatusState from "./components/JurStatusState";

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
