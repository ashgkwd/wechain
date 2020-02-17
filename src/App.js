import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "./App.css";

import { thorify } from "thorify";
const Web3 = require("web3");
const web3 = thorify(new Web3(), "http://localhost:8669");

const { Header, Footer, Content } = Layout;

class TxDisplay extends React.Component {
  constructor() {
    super();
    this.account = "0x8219094017Ff969dCd39957b09DB8a76BbD685e9";
    this.receiver = "0xb8d8C361c5C71C0959d7d419f50B0B90A3E3D3cd";
    this.state = { label: "loading", balance: "na", energy: "na" };
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

  render() {
    return (
      <div>
        <p>{this.state.label}</p>
        <p>Account: {this.account}</p>
        <p>Balance: {this.state.balance}</p>
        <p>Energy: {this.state.energy}</p>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Layout>
        <Header className="App-header">Transfer your money safely! 😉</Header>
        <Content className="App-content">
          <TxDisplay />
        </Content>
        <Footer>
          Created with ❤️ by Ashish &middot; Source at <a href="">Github</a>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
