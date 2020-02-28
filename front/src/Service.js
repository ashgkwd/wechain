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

export default (function service() {
  const web3 = thorify(new Web3(), BLOCKCHAIN);

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
      return this.getJurStatusContract()
        .methods.addStatusType(name)
        .send({ from: this.getOwnerAddress(), gas: 500000 })
        .then(res => {
          console.log("created jur status type", res);
          return res;
        });
    },

    createJurStatus(address, type) {
      return this.getJurStatusContract()
        .methods.addJurStatus(address, type)
        .send({ from: this.getOwnerAddress(), gas: 500000 })
        .then(res => {
          console.log("created jur status of type", type, res);
          return res;
        });
    },

    changeJurStatus(address, state) {
      return this.getJurStatusContract()
        .methods.addJurStatus(address, state)
        .send({ from: this.getOwnerAddress(), gas: 500000 })
        .then(res => {
          console.log("changed jur status to", state, res);
          return res;
        });
    }
  };
})();
