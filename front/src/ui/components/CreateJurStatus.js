import { Button, Card, Form, Input, message, Spin } from "antd";
import React, { useState } from "react";
import HistoryCard from "./HistoryCard";
import Service from "../../Service";
import { createOnChange } from "../../Util";

export default function CreateJurStatus() {
  const [inTransaction, setInTransaction] = useState(false);
  const [address, setAddress] = useState("");
  const [history, setHistory] = useState([]);
  const [type, setType] = useState(0);

  const onAddressChange = createOnChange(setAddress);
  const onTypeChange = createOnChange(setType);

  function appendToHistory(transaction) {
    setHistory([transaction].concat(history));
  }

  function isInputValid() {
    if (!address || !type) {
      message.warn("Please provide valid address and type index");
      return false;
    }

    if (address && (address.length < 40 || address.length > 42)) {
      message.warn("Please ensure that the address is valid");
      return false;
    }

    if (type) {
      if (!isFinite(type) || type < 0) {
        message.warn("Please provide valid Jur Status Type index");
        return false;
      }
    }

    return true;
  }

  function createJurStatus() {
    if (!isInputValid()) return;

    setInTransaction(true);
    return Service.createJurStatus(address, type)
      .then(res => {
        message.success("Created Jur Status");
        appendToHistory({ to: address, ...res });
      })
      .catch(err => {
        message.error("Failed to create Jur Status");
        console.error("failed to create status", err);
        appendToHistory({ to: address, error: err });
      })
      .finally(() => setInTransaction(false));
  }

  return (
    <>
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
      <br />
      <HistoryCard history={history}></HistoryCard>
    </>
  );
}
