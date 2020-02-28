import { Button, Card, Form, Input, message, Spin } from "antd";
import React, { useState } from "react";
import Service from "../../Service";
import DebugCard from "./DebugCard";

export default function CreateJurStatusType() {
  const [inTransaction, setInTransaction] = useState(false);
  const [name, setName] = useState("");

  function onNameChange(e) {
    setName(e.target.value);
  }

  function createJurStatusType() {
    if (!name) {
      message.warn("Please provide Jur Status Type");
      return;
    }

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
        <Form.Item label="Jur Status Type" required>
          <Input placeholder="Cambodia" onChange={onNameChange} />
        </Form.Item>
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
