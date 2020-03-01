const { web3 } = require("./blockchain");

module.exports = function transferHandle(req, res) {
  const { to, value } = req.body;

  web3.eth.accounts
    .signTransaction({ to, value }, process.env.PRIVATE_KEY)
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
