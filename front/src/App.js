import React, { useState } from "react";
import { Layout } from "antd";
import AppHeader from "./ui/AppHeader";
import { TransferScreen, JurStatusScreen } from "./ui/screens";
import TxDisplay from "./TxDisplay";
import "antd/dist/antd.css";
import "./App.css";

const { Header, Footer, Content } = Layout;

function App() {
  const [screen, setScreen] = useState("transfer");
  function onScreenChange(e) {
    setScreen(e.target.value);
  }

  return (
    <div className="App">
      <Layout>
        <AppHeader screen={screen} onScreenChange={onScreenChange} />
        <Content className="App-content">
          {screen == "transfer" ? <TransferScreen /> : <JurStatusScreen />}
        </Content>
        <Footer>
          Created with ❤️ by Ashish &middot; Source at <a href="">Github</a>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
