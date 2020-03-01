const { thorify } = require("thorify");
const Web3 = require("web3");
const contractConfig = require("./contract-build/contracts/JurStatusABI.json");

const WHITELIST = ["addStatusType", "addJurStatus", "changeState"];
const web3 = thorify(new Web3(), process.env.BLOCKCHAIN);

const ownerAccount = web3.eth.accounts.privateKeyToAccount(
  process.env.PRIVATE_KEY
);

web3.eth.accounts.wallet.add(ownerAccount);

const contract = new web3.eth.Contract(
  contractConfig.abi,
  contractConfig.address,
  {
    from: ownerAccount.address
  }
);

module.exports = function jurHandle(req, res) {
  const { method, params } = req.body;

  if (!WHITELIST.includes(method)) return res.sendStatus(404);

  return contract.methods[method](...params)
    .send({ from: ownerAccount.address, gas: 500000 })
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
