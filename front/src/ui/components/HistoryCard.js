import { Alert, Card, List } from "antd";
import React from "react";
import styled from "styled-components";

function trimHash(hash = "") {
  return hash.substr(0, 7) + "..." + hash.substr(hash.length - 5);
}

const Hidable = styled.p`
  display: ${props => (props.hide ? "none" : "block")};
`;

function HistoryCard({ history = [] }) {
  return (
    <Card title="Transaction History">
      <List>
        {history.map((h, i) => (
          <List.Item key={i}>
            <div>
              <Hidable hide={!h.to || !h.value}>
                Addr: <strong title={h.to}>{trimHash(h.to)}</strong> &emsp;
                Value: <strong>{h.value}</strong>
              </Hidable>
              <Hidable hide={!h.transactionHash}>
                Tx ID:{" "}
                <a
                  href={
                    "https://insight.vecha.in/#/test/txs/" + h.transactionHash
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {trimHash(h.transactionHash)}
                </a>
              </Hidable>
              {h.error ? <Alert message={h.error} type="error" /> : null}
              <p>{h.extra}</p>
            </div>
          </List.Item>
        ))}
      </List>
    </Card>
  );
}

export default HistoryCard;
