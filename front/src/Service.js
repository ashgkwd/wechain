import { handleFetch } from "./Util";
import contractConfig from "./contract-build/contracts/JurStatusABI";
const Web3 = require("web3");

const NODE_SERVER = process.env.REACT_APP_NODE_SERVER;
const BLOCKCHAIN = process.env.REACT_APP_BLOCKCHAIN;
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;

function executeJur(method, params = []) {
  return fetch(NODE_SERVER + "/jur", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ method, params })
  }).then(handleFetch);
}

export default (function service() {
  const web3 = new Web3(BLOCKCHAIN);
  const ownerAccount = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
  const contract = new web3.eth.Contract(
    contractConfig.abi,
    contractConfig.address,
    { from: ownerAccount.address }
  );

  web3.eth.accounts.wallet.add(ownerAccount);

  return {
    getOwnerAddress() {
      return ownerAccount.address;
    },

    getBalance() {
      return web3.eth.getBalance(ownerAccount.address);
    },

    getJurStatusTypes(index = 0) {
      return contract.methods
        .statusTypes(index)
        .call()
        .then(res => {
          console.log("fetched jur status types", res);
          return res;
        });
    },

    getJurStatusCount() {
      return contract.methods
        .statusCount()
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
      return fetch(NODE_SERVER + "/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(tx)
      }).then(handleFetch);
    }
  };
})();
