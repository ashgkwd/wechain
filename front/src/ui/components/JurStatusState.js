import { Button, Card, Form, Input, message, Spin, Switch } from "antd";
import React, { useState } from "react";
import HistoryCard from "./HistoryCard";
import Service from "../../Service";

export default function JurStatusState() {
  const [inTransaction, setInTransaction] = useState(false);
  const [address, setAddress] = useState("");
  const [history, setHistory] = useState([]);

  function appendToHistory(transaction) {
    setHistory([transaction].concat(history));
  }

  function onAddressChange(e) {
    setAddress(e.target.value);
  }

  const [state, setState] = useState(0);

  function onStateChange(value) {
    console.log("switch status", value);
    setState(value ? 1 : 0);
  }

  function changeJurState() {
    if (!address) {
      message.warn("Please provide valid address");
      return;
    } else if (address.length < 40 || address.length > 42) {
      message.warn("Please ensure that the address is valid");
      return;
    }

    setInTransaction(true);
    return Service.changeJurState(address, state)
      .then(res => {
        message.success("Changed Jur Status");
        setInTransaction(false);
        appendToHistory({ to: address, ...res });
      })
      .catch(err => {
        message.error("Failed to change Jur Status");
        setInTransaction(false);
        appendToHistory({ to: address, error: err });
      });
  }

  return (
    <>
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
        <Button onClick={changeJurState} disabled={inTransaction}>
          {inTransaction ? (
            <span>
              <Spin size="small" /> &emsp; Changing
            </span>
          ) : (
            "Change State"
          )}
        </Button>
      </Card>
      <br />
      <HistoryCard history={history}></HistoryCard>
    </>
  );
}
