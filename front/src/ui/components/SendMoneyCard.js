import { Button, Card, Form, Input, message, Spin } from "antd";
import React, { useState } from "react";
import Service from "../../Service";
import { createOnChange } from "../../Util";

function SendMoneyCard({ onSend }) {
  const [recipient, setRecipient] = useState();
  const [amount, setAmount] = useState();
  const [inTransaction, setInTransaction] = useState(false);

  const onRecipientChange = createOnChange(setRecipient);
  const onAmountChange = createOnChange(setAmount);

  function sendMoney() {
    if (!recipient) return message.warn("Please provide a valid recipient");
    if (!amount) return message.warn("Please provide a valid amount");

    setInTransaction(true);
    const transaction = { to: recipient, value: amount };
    Service.sendMoney(transaction)
      .then(res => {
        console.log("send money", res);
        message.success("Transaction successfull");

        setInTransaction(false);
        onSend({ ...transaction, ...res });
      })
      .catch(err => {
        console.error("failed to send money", err);
        message.error("Failed to send money");
        setInTransaction(false);
        onSend({ ...transaction, error: err, errorObject: err });
      });
  }

  return (
    <Card title="Send VET 🤑">
      <Form.Item label="Recipient Address" required>
        <Input placeholder="0x5omebod9" onChange={onRecipientChange} />
      </Form.Item>

      <Form.Item label="Amount" required>
        <Input placeholder="512" onChange={onAmountChange} />
      </Form.Item>
      <Button onClick={sendMoney} disabled={inTransaction}>
        {inTransaction ? (
          <span>
            <Spin size="small" /> &emsp; Sending
          </span>
        ) : (
          "Send Now"
        )}
      </Button>
    </Card>
  );
}

export default SendMoneyCard;
