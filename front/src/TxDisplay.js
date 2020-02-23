import React from "react";
import { Button, Card, Row, Col, Input, Spin } from "antd";
import TxHistory from "./TxHistory";
import "antd/dist/antd.css";
import "./App.css";

import { thorify } from "thorify";
const Web3 = require("web3");

const BLOCKCHAIN = process.env.REACT_APP_BLOCKCHAIN || "http://3.19.70.175:80";

const web3 = thorify(new Web3(), BLOCKCHAIN);

const OWNER_ADDRESS =
  process.env.REACT_APP_OWNER_ADDRESS ||
  "0x8219094017Ff969dCd39957b09DB8a76BbD685e9";

const Owner = {
  address: OWNER_ADDRESS
};

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
    web3.eth
      .getBalance(Owner.address)
      .then(bal => this.setState({ ownerBalance: bal }));
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

    return fetch("//kamui.tech:3080/sendTx", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tx)
    })
      .then(blob => blob.json())
      .then(receipt => {
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
              <span>{Owner.address}</span>
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
