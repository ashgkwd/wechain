import React, { useEffect, useState } from "react";
import { List, Card, Alert } from "antd";
import styled from "styled-components";

function trimHash(hash = "") {
  return hash.substr(0, 7) + "..." + hash.substr(hash.length - 5);
}

const TxID = styled.p`
  display: ${props => (props.hide ? "none" : "block")};
`;

function HistoryCard({ history = [] }) {
  return (
    <Card title="Transaction History">
      <List>
        {history.map((h, i) => (
          <List.Item key={i}>
            <div>
              <p>
                To: <strong>{trimHash(h.to)}</strong> &emsp; VET:{" "}
                <strong>{h.value}</strong>
              </p>
              <TxID hide={!trimHash.transactionHash}>
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
              </TxID>
              {h.error ? <Alert message={h.error} type="error" /> : null}
            </div>
          </List.Item>
        ))}
      </List>
    </Card>
  );
}

export default HistoryCard;
