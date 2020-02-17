import React from "react";
import { Button, Card, Row, Col, Input } from "antd";
import "antd/dist/antd.css";
import "./App.css";

import { thorify } from "thorify";
const Web3 = require("web3");
const web3 = thorify(new Web3(), "http://localhost:8669");

const { Meta } = Card;

const Owner = {
  address: "0x8219094017Ff969dCd39957b09DB8a76BbD685e9"
};

export default class TxDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      ownerBalance: "na"
    };

    // TODO: make a call to fetch balance
    this.account = "0x8219094017Ff969dCd39957b09DB8a76BbD685e9";
    this.privateKey = "hidden";
    this.receiver = "0xb8d8C361c5C71C0959d7d419f50B0B90A3E3D3cd";
    this.loader = fetch("http://localhost:8669/accounts/" + this.account)
      .then(res => {
        console.log("received success from account", res);
        return res.json();
      })
      .then(data => {
        console.log("data", data);
        this.setState({
          label: "loaded",
          balance: data.balance,
          energy: data.energy
        });
        return data;
      })
      .catch(err => {
        console.error("received error", err);
      });

    this.thorify = web3.eth
      .getBalance(this.account)
      .then(res => console.log("received genesis", res));
  }

  getBalance = () => {
    web3.eth
      .getBalance(Owner.address)
      .then(bal => this.setState({ ownerBalance: bal }));
  };

  componentDidMount() {
    this.getBalance();
  }

  sendSignedTransaction = rawTransaction => {
    web3.eth.sendSignedTransaction(rawTransaction).on("receipt", data => {
      console.log("transaction receipt", data);
      this.setState({ transaction: "success" });
    });
  };

  sendMoney = () => {
    const tx = {
      to: this.receiver,
      value: 10000
    };

    this.sending = web3.eth.accounts
      .signTransaction(tx, this.privateKey)
      .then(res => {
        console.log("received signed transaction", res);
        return this.sendSignedTransaction(res.rawTransaction);
      })
      .catch(err => {
        console.error("failed to sign", err);
      });
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
              <Input placeholder="Receipient address" />
            </p>

            <p>
              <Input placeholder="Amount" />
            </p>
            <Button onClick={this.sendMoney}>Send Now</Button>
          </Card>
        </Col>

        <Col span={6}></Col>
      </Row>
    );
  }
}
