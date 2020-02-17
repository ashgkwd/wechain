import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "./App.css";

const { Header, Footer, Content } = Layout;

class TxDisplay extends React.Component {
  constructor() {
    super();
    this.account = "0x8219094017Ff969dCd39957b09DB8a76BbD685e9";
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
