import React from "react";
import { Button, Card, Row, Col, Input } from "antd";
import "antd/dist/antd.css";
import "./App.css";

import { thorify } from "thorify";
const Web3 = require("web3");
const web3 = thorify(new Web3(), "http://localhost:8669");

const Owner = {
  address: "0x8219094017Ff969dCd39957b09DB8a76BbD685e9",
  privateKey:
    "0x427060bc17768d444ce014fab2d7aea94ed9548640777e1b85a5ec74d82fb82f"
};

export default class TxDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      ownerBalance: "na"
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

  sendSignedTransaction = rawTransaction => {
    web3.eth.sendSignedTransaction(rawTransaction).on("receipt", data => {
      console.log("transaction receipt", data);
      this.setState({ transaction: "success" });
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

    this.sending = web3.eth.accounts
      .signTransaction(tx, Owner.privateKey)
      .then(res => {
        console.log("received signed transaction", res);
        return this.sendSignedTransaction(res.rawTransaction);
      })
      .catch(err => {
        console.error("failed to sign", err);
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
            <Button onClick={this.sendMoney}>Send Now</Button>
          </Card>
        </Col>

        <Col span={6}></Col>
      </Row>
    );
  }
}
