# WeChain

Simple react and node based app to send money from owner's wallet to desired destination wallet.

## Installation

```sh
git clone https://github.com/ashgkwd/wechain.git
cd wechain/front && yarn
cd ../server && yarn
```

## Start

For react based front end `cd front` and
`PRIVATE_KEY=yourlonglongprivatekey npm start`

For node based back end `cd server` and
`PRIVATE_KEY=yourlonglongprivatekey node index.js`

Optional params for node server are:

- `PORT` eg. PORT=2020
- `BLOCKCHAIN` eg. BLOCKCHAIN=https://sync-testnet.vechain.org

Optional params for react env are:

- `REACT_APP_BLOCKCHAIN` eg. REACT_APP_BLOCKCHAIN=http://3.19.70.175:80
- `REACT_APP_NODE_SERVER` eg. REACT_APP_NODE_SERVER=http://kamui.tech:3080

## How to obtain private key?

You will need to export keystore file. You can do that using popular Sync app. Then using keystore file's info, you can obtain private key.

Ref:

- `web3 account extract --keyfile ~/Downloads/keystore-file --password password` from https://ethereum.stackexchange.com/questions/3720/how-do-i-get-the-raw-private-key-from-my-mist-keystore-file
- https://gist.github.com/ashgkwd/0129d944b69bf6cd845158c4ef6ee6f3
- https://www.ledger.com/vechain-sync
- https://github.com/vechain/thor-sync/wiki/Account

## Do I need local thor node running?

If you are not using public thor node, you will need to run a local node. Here are steps to do that:

- Install `thor` https://github.com/vechain/thor
- Run thor `bin/thor --network test --api-cors "*"`

# Production Links

## Front - React App

React app is deployed at http://kamui.tech:8033/
