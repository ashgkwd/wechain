import { Button, Card, Form, Input, message, Spin, Switch } from "antd";
import React, { useState } from "react";
import Service from "../../Service";

export default function JurStatusState() {
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
    if (!address) {
      message.warn("Please provide valid address");
      return;
    } else if (address.length < 40 || address.length > 42) {
      message.warn("Please ensure that the address is valid");
      return;
    }

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
      <Form.Item label="Address of assigned" required>
        <Input placeholder="Address" onChange={onAddressChange} />
      </Form.Item>
      <p>
        <Switch
          onChange={onStateChange}
          checkedChildren="1"
          unCheckedChildren="0"
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
