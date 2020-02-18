import React from "react";
import { Layout } from "antd";
import TxDisplay from "./TxDisplay";
import "antd/dist/antd.css";
import "./App.css";

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header className="App-header">
          Put your address for free VET! 😉
        </Header>
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
