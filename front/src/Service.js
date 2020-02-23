import { thorify } from "thorify";
import JurStatusContract from "./contract-build/contracts/JurStatus";
const Web3 = require("web3");

const BLOCKCHAIN = process.env.REACT_APP_BLOCKCHAIN || "http://3.19.70.175:80";
console.log("printing env blockchain", BLOCKCHAIN);

const OWNER_ADDRESS =
  process.env.REACT_APP_OWNER_ADDRESS ||
  "0x8219094017Ff969dCd39957b09DB8a76BbD685e9";

console.log("printing env owner address", OWNER_ADDRESS);

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

  web3.eth.accounts.wallet.add(getOwnerAccount());

  return {
    getOwnerAddress() {
      return OWNER_ADDRESS;
    },

    getWeb3Instance() {
      return web3;
    },

    getOwnerAccount,

    getJurStatusContract(address = OWNER_ADDRESS) {
      return new web3.eth.Contract(JurStatusContract.abi, address);
    },

    getJurStatusTypes() {
      return this.getJurStatusContract()
        .methods.statusTypes(0)
        .send({ from: this.getOwnerAddress(), gas: 100000 })
        .then(res => {
          console.log("fetched jur status types", res);
          return res;
        });
    }
  };
})();
