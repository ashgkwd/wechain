import { Col, Row } from "antd";
import React, { useState } from "react";
import HistoryCard from "./components/HistoryCard";
import OwnerCard from "./components/OwnerCard";
import SendMoneyCard from "./components/SendMoneyCard";

function TransferScreen() {
  const [history, setHistory] = useState([]);

  function appendToHistory(transaction) {
    setHistory([transaction].concat(history));
  }

  return (
    <Row type="flex" justify="space-around">
      <Col span={8}>
        <OwnerCard />
      </Col>
      <Col span={7}>
        <SendMoneyCard onSend={appendToHistory} />
      </Col>
      <Col span={7}>
        <HistoryCard history={history} />
      </Col>
    </Row>
  );
}

export default TransferScreen;
