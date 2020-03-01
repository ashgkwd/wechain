import { thorify } from "thorify";
import JurStatusContract from "./contract-build/contracts/JurStatusABI";
const Web3 = require("web3");

const BLOCKCHAIN = process.env.REACT_APP_BLOCKCHAIN || "http://3.19.70.175:80";
console.log("printing env blockchain", BLOCKCHAIN);

const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;
if (!PRIVATE_KEY)
  console.error(
    "you must provide REACT_APP_PRIVATE_KEY. Received",
    PRIVATE_KEY
  );

function executeJur(method, params = []) {
  return fetch(process.env.REACT_APP_NODE_SERVER + "/jur", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ method, params })
  }).then(blob => blob.json());
}

export default (function service() {
  console.log("given provider by web3", Web3.givenProvider);
  let thorified = thorify(new Web3(), "https://sync-testnet.vechain.org");
  let web3 = new Web3("http://127.0.0.1:8545");

  function getOwnerAccount() {
    return web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
  }

  function getJurStatusContract(address) {
    return new web3.eth.Contract(
      JurStatusContract.abi,
      JurStatusContract.address,
      { from: address || getOwnerAccount().address }
    );
  }

  web3.eth.accounts.wallet.add(getOwnerAccount());
  thorified.eth.accounts.wallet.add(getOwnerAccount());

  // getJurStatusContract().events.StatusAdded();

  return {
    getOwnerAddress() {
      return getOwnerAccount().address;
    },

    getWeb3Instance() {
      return web3;
    },

    getOwnerAccount,
    getJurStatusContract,

    getBalance(address) {
      return this.getWeb3Instance().eth.getBalance(
        address || this.getOwnerAddress()
      );
    },

    getJurStatusTypes(index = 0) {
      return this.getJurStatusContract()
        .methods.statusTypes(index)
        .call()
        .then(res => {
          console.log("fetched jur status types", res);
          return res;
        });
    },

    getJurStatusCount() {
      return this.getJurStatusContract()
        .methods.statusCount()
        .call()
        .then(res => {
          console.log("fetched jur status count", res);
          return res;
        });
    },

    createJurStatusType(name) {
      return executeJur("addStatusType", [name]);
    },

    createJurStatus(address, type) {
      return executeJur("addJurStatus", [address, type]);
    },

    changeJurState(address, state) {
      return executeJur("changeState", [address, state]);
    },

    sendMoney(tx) {
      return fetch(process.env.REACT_APP_NODE_SERVER + "/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(tx)
      }).then(res => {
        console.log("received send money server response", res);
        return res.ok
          ? res.json()
          : new Promise((resolve, reject) => {
              res
                .text()
                .then(reject)
                .catch(reject);
            });
      });
    }
  };
})();
