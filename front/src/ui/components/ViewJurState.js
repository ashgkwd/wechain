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

  function viewJurState() {
    if (!address) {
      message.warn("Please provide valid address");
      return;
    } else if (address.length < 40 || address.length > 42) {
      message.warn("Please ensure that the address is valid");
      return;
    }

    setInTransaction(true);
    return Service.getJurState(address)
      .then(res => {
        message.success("Fetched state successfully");
        setInTransaction(false);
        appendToHistory({
          to: address,
          value: res.isActive ? "true" : "false"
        });
      })
      .catch(err => {
        message.error("Failed to fetch state");
        setInTransaction(false);
        appendToHistory({ to: address, error: err });
      });
  }

  return (
    <>
      <Card title="View Jur Status State">
        <Form.Item label="Address of assigned" required>
          <Input placeholder="Address" onChange={onAddressChange} />
        </Form.Item>

        <Button onClick={viewJurState} disabled={inTransaction}>
          {inTransaction ? (
            <span>
              <Spin size="small" /> &emsp; Fetching
            </span>
          ) : (
            "View State"
          )}
        </Button>
      </Card>
      <br />
      <HistoryCard history={history}></HistoryCard>
    </>
  );
}
