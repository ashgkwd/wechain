import { Col, Row } from "antd";
import React, { useState, useEffect } from "react";
import HistoryCard from "./components/HistoryCard";
import OwnerCard from "./components/OwnerCard";
import SendMoneyCard from "./components/SendMoneyCard";
import Service from "../Service";

function TransferScreen() {
  const [history, setHistory] = useState([]);
  const [balance, setBalance] = useState("NA");
  useEffect(getBalance, []);

  function onMoneySend(transaction) {
    setHistory([transaction].concat(history));
    getBalance();
  }

  function getBalance() {
    Service.getBalance().then(setBalance);
  }

  return (
    <Row type="flex" justify="space-around">
      <Col span={8}>
        <OwnerCard balance={balance} />
      </Col>
      <Col span={7}>
        <SendMoneyCard onSend={onMoneySend} />
      </Col>
      <Col span={7}>
        <HistoryCard history={history} />
      </Col>
    </Row>
  );
}

export default TransferScreen;
