const { thorify } = require("thorify");
const Web3 = require("web3");

const web3 = thorify(new Web3(), process.env.BLOCKCHAIN);

const ownerAccount = web3.eth.accounts.privateKeyToAccount(
  process.env.PRIVATE_KEY
);

web3.eth.accounts.wallet.add(ownerAccount);

module.exports = { web3, ownerAccount };
