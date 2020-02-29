const { thorify } = require("thorify");
const Web3 = require("web3");
const JurStatusContract = require("./contract-build/contracts/JurStatusABI.json");
const BLOCKCHAIN = process.env.BLOCKCHAIN || "http://localhost:8669";
const web3 = thorify(new Web3(), "https://sync-testnet.vechain.org");
// let web3 = new Web3("http://127.0.0.1:8545");
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const WHITELIST = ["addStatusType", "addJurStatus", "changeState"];

function getOwnerAccount() {
  return web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
}

function getOwnerAddress() {
  return getOwnerAccount().address;
}

web3.eth.accounts.wallet.add(getOwnerAccount());

function getJurStatusContract(address) {
  return new web3.eth.Contract(
    JurStatusContract.abi,
    JurStatusContract.address,
    { from: address || getOwnerAddress() }
  );
}

module.exports = function jurHandle(req, res) {
  const { method, params } = req.body;

  if (!WHITELIST.includes(method)) return res.sendStatus(404);

  return getJurStatusContract()
    .methods[method](...params)
    .send({ from: getOwnerAddress(), gas: 500000 })
    .then(data => {
      console.log("jur success response", data);
      res.send(data);
    })
    .catch(err => {
      console.error("jur failure response", err);
      res.status(401);
      res.send(err.message);
    });
};
