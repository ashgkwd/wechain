import { Card } from "antd";
import React from "react";
import Service from "../../Service";

function OwnerCard({ balance }) {
  return (
    <Card title="Owner Account 😎" bordered={false}>
      <p>
        <strong>Address</strong>
        <br />
        <span>{Service.getOwnerAddress()}</span>
      </p>
      <p>
        <strong>Balance</strong>
        <br />
        <span>{balance}</span>
      </p>
    </Card>
  );
}

export default OwnerCard;
