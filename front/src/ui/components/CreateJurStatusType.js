import { Button, Card, Form, Input, message, Spin } from "antd";
import React, { useState } from "react";
import Service from "../../Service";
import DebugCard from "./DebugCard";
import HistoryCard from "./HistoryCard";

export default function CreateJurStatusType() {
  const [history, setHistory] = useState([]);
  const [inTransaction, setInTransaction] = useState(false);
  const [name, setName] = useState("");

  function appendToHistory(transaction) {
    setHistory([transaction].concat(history));
  }

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
      .then(res => {
        message.success("Created Jur Status Type");
        console.log("Created Jur Status Type", res);
        setInTransaction(false);
        appendToHistory(res);
      })
      .catch(err => {
        message.error("Failed to create Jur Status Type");
        console.error("failed to create type", err);
        setInTransaction(false);
        appendToHistory({ error: err });
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
      <br />
      <HistoryCard history={history}></HistoryCard>
      <DebugCard></DebugCard>
    </>
  );
}
