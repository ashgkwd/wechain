import { Button, Card, Form, Input, message, Spin } from "antd";
import React, { useState } from "react";
import Service from "../../Service";

export default function CreateJurStatus() {
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
    if (!address || !type) {
      message.warn("Please provide valid address and type index");
      return;
    }

    if (address && (address.length < 40 || address.length > 42)) {
      message.warn("Please ensure that the address is valid");
      return;
    }

    if (type) {
      if (!isFinite(type) || type < 0) {
        message.warn("Please provide valid Jur Status Type index");
        return;
      }
    }

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
      <Form.Item label="Address to assign" required>
        <Input placeholder="0x6omebody5" onChange={onAddressChange} />
      </Form.Item>
      <Form.Item label="Jur Status Type Index" required>
        <Input placeholder="1" onChange={onTypeChange} />
      </Form.Item>
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
