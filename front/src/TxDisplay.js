import React from "react";
import { Button, Card, Row, Col, Input, Spin, message } from "antd";
import TxHistory from "./TxHistory";
import "antd/dist/antd.css";
import "./App.css";
import Service from "./Service";

export default class TxDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      inTransaction: false,
      ownerBalance: "na",
      history: [
        {
          hash:
            "0x483c294a159cd88cc9d20459503b3108bb874b029b83415722f83b98ae13d346",
          amount: "1222",
          recepient: "0xDemoHistory"
        }
      ]
    };
  }

  componentDidMount() {
    this.getBalance();
  }

  getBalance = () => {
    Service.getBalance()
      .then(bal => this.setState({ ownerBalance: bal }))
      .catch(err => {
        console.error("failed to fetch balance", err);
        message.error("Failed to fetch balance");
      });
  };

  getTx = () => {
    console.log("tx receiver and amount", this.recepient, this.amount);
    if (!this.recepient || !this.amount) return null;
    return {
      to: this.recepient,
      value: this.amount
    };
  };

  sendMoney = () => {
    const tx = this.getTx();
    if (!tx) return;

    this.setState({ inTransaction: true });

    return fetch(process.env.REACT_APP_NODE_SERVER + "/sendTx", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tx)
    })
      .then(blob => blob.json())
      .then(receipt => {
        message.info("Transaction initiated");
        this.setState({
          inTransaction: false,
          history: [
            {
              hash: receipt.transactionHash,
              recepient: this.recepient,
              amount: this.amount
            }
          ].concat(this.state.history)
        });
      })
      .catch(err => {
        console.error("failed to sign", err);
        message.error("Failed to send money");
        this.setState({ inTransaction: false });
      });
  };

  updateRecepient = e => {
    this.recepient = e.target.value;
  };

  updateAmount = e => {
    this.amount = e.target.value;
  };

  render() {
    return (
      <Row type="flex" justify="space-around">
        <Col span={8}>
          <Card title="Owner Account 😎" bordered={false}>
            <p>
              <strong>Address</strong>
              <br />
              <span>{Service.getOwnerAddress()}</span>
            </p>
            <p>
              <strong>Balance</strong>
              <br />
              <span>{this.state.ownerBalance}</span>
            </p>
          </Card>
        </Col>

        <Col span={6}>
          <Card title="Send VET 🤑">
            <p>
              <Input
                placeholder="Receipient address"
                onChange={this.updateRecepient}
              />
            </p>

            <p>
              <Input placeholder="Amount" onChange={this.updateAmount} />
            </p>
            <Button
              onClick={this.sendMoney}
              disabled={this.state.inTransaction}
            >
              {this.state.inTransaction ? (
                <span>
                  <Spin size="small" /> &emsp; Sending
                </span>
              ) : (
                "Send Now"
              )}
            </Button>
          </Card>
        </Col>

        <Col span={6}>
          <TxHistory history={this.state.history} />
        </Col>
      </Row>
    );
  }
}
