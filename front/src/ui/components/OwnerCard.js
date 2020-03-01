import { Card } from "antd";
import React, { useEffect, useState } from "react";
import Service from "../../Service";

function OwnerCard() {
  const [balance, setBalance] = useState("NA");
  useEffect(() => {
    Service.getBalance().then(setBalance);
  }, []);

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
