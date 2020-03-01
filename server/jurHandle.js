const { web3, ownerAccount } = require("./blockchain");
const contractConfig = require("./contract-build/contracts/JurStatusABI.json");

const WHITELISTED_METHODS = ["addStatusType", "addJurStatus", "changeState"];

// NOTE: We can read white listed methods from contract ABI also:
//
// const whitelistedMethods = contractConfig.abi.filter(a => {
//   a.stateMutability == "nonpayable" && a.name
// }).map(a => a.name);

const contract = new web3.eth.Contract(
  contractConfig.abi,
  contractConfig.address,
  {
    from: ownerAccount.address
  }
);

module.exports = function jurHandle(req, res) {
  const { method, params = [] } = req.body;

  if (!WHITELISTED_METHODS.includes(method)) return res.sendStatus(404);

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
