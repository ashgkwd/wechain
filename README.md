# WeChain

Simple react and node based app to send money from owner's wallet to desired destination wallet.

## Installation

```sh
git clone https://github.com/ashgkwd/wechain.git
cd wechain/front && yarn
cd ../server && yarn
```

## Start

For react based front end `cd front && npm start`

For node based back end `cd server` and
`PRIVATE_KEY=yourlonglongprivatekey node index.js`

Optional params for node are:

- `PORT` eg. PORT=2020
- `BLOCKCHAIN` eg. BLOCKCHAIN=https://sync-testnet.vechain.org

## How to obtain private key?

You will need to export keystore file. You can do that using popular Sync app. Then using keystore file's info, you can obtain private key.

Ref:

- `web3 account extract --keyfile ~/Downloads/keystore-file --password password` from https://ethereum.stackexchange.com/questions/3720/how-do-i-get-the-raw-private-key-from-my-mist-keystore-file
- https://gist.github.com/ashgkwd/0129d944b69bf6cd845158c4ef6ee6f3
- https://www.ledger.com/vechain-sync
- https://github.com/vechain/thor-sync/wiki/Account
