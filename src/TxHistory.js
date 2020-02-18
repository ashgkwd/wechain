import React from "react";
import { List, Card } from "antd";
import "antd/dist/antd.css";
import "./App.css";

function trimHash(hash) {
  return hash.substr(0, 7) + "..." + hash.substr(hash.length - 5);
}

export default class TxHistory extends React.Component {
  openInsight = hash => () =>
    window.open("https://insight.vecha.in/#/test/txs/" + hash);

  render() {
    const { history } = this.props;

    return (
      <Card title="Transaction History">
        <List>
          {history.map(h => (
            <List.Item key={h.hash}>
              <div>
                <p>
                  To: <strong>{trimHash(h.recepient)}</strong> &emsp; VET:{" "}
                  <strong>{h.amount}</strong>
                </p>
                <p>
                  Tx ID:{" "}
                  <a
                    href={"https://insight.vecha.in/#/test/txs/" + h.hash}
                    target="_blank"
                  >
                    {trimHash(h.hash)}
                  </a>
                </p>
              </div>
            </List.Item>
          ))}
        </List>
      </Card>
    );
  }
}
