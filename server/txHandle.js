const { thorify } = require("thorify");
const Web3 = require("web3");
const BLOCKCHAIN = process.env.BLOCKCHAIN || "http://localhost:8669";
const web3 = thorify(new Web3(), "https://sync-testnet.vechain.org");
// let web3 = new Web3("http://127.0.0.1:8545");
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = function txHandle(req, res) {
  const { to, value } = req.body;

  console.log("to", to, "and value", value, "private key", PRIVATE_KEY);

  web3.eth.accounts
    .signTransaction({ to, value }, PRIVATE_KEY)
    .then(data => {
      console.log("received signed transaction", data);
      return sendSignedTransaction(res, data.rawTransaction);
    })
    .catch(err => {
      console.error("failed to sign", err);
      res.status(401);
      res.send(err.message);
    });
};

function sendSignedTransaction(res, raw) {
  return web3.eth.sendSignedTransaction(raw).on("receipt", receipt => {
    console.log("transaction receipt", receipt);
    res.send(receipt);
  });
}
