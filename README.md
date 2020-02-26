# WeChain

Simple react and node based app to send money from owner's wallet to desired destination wallet.

## Installation

```sh
git clone https://github.com/ashgkwd/wechain.git
cd wechain/front && yarn
cd ../server && yarn
```

## Start

For react based front end `cd front` and
`PRIVATE_KEY=yourlonglongprivatekey npm start`

For node based back end `cd server` and
`PRIVATE_KEY=yourlonglongprivatekey node index.js`

Optional params for node server are:

- `PORT` eg. PORT=2020
- `BLOCKCHAIN` eg. BLOCKCHAIN=https://sync-testnet.vechain.org

Optional params for react env are:

- `REACT_APP_BLOCKCHAIN` eg. REACT_APP_BLOCKCHAIN=http://3.19.70.175:80
- `REACT_APP_NODE_SERVER` eg. REACT_APP_NODE_SERVER=http://kamui.tech:3080

## How to obtain private key?

You will need to export keystore file. You can do that using popular Sync app. Then using keystore file's info, you can obtain private key.

Ref:

- `web3 account extract --keyfile ~/Downloads/keystore-file --password password` from https://ethereum.stackexchange.com/questions/3720/how-do-i-get-the-raw-private-key-from-my-mist-keystore-file
- https://gist.github.com/ashgkwd/0129d944b69bf6cd845158c4ef6ee6f3
- https://www.ledger.com/vechain-sync
- https://github.com/vechain/thor-sync/wiki/Account

## Do I need local thor node running?

If you are not using public thor node, you will need to run a local node. Here are steps to do that:

- Install `thor` https://github.com/vechain/thor
- Run thor `bin/thor --network test --api-cors "*"`

### Server thor node setup

```sh
sudo apt update
sudo apt install build-essential
wget https://dl.google.com/go/go1.14.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.14.linux-amd64.tar.gz
echo "export PATH=\$PATH:/usr/local/go/bin" >> .profile
source .profile
git clone https://github.com/vechain/thor.git
cd thor
make dep
make all
```

Run thor using `bin/thor --network test --api-cors "*" --api-addr 0.0.0.0:8669`

Ref: https://www.reddit.com/r/Vechain/comments/99jgs3/how_to_build_a_dapp_on_vechain_initial_steps/
Ref: https://medium.com/@muhammadtriwibowo/set-permanently-ulimit-n-open-files-in-ubuntu-4d61064429a

### Server react and node setup

You will need node and npm. Ref: https://tecadmin.net/install-latest-nodejs-npm-on-ubuntu/

```sh
git clone https://github.com/ashgkwd/wechain.git
cd wechain/front && npm install
npm run build
cd /var/www/http && sudo ln -s /home/ubuntu/wechain/front/build/ wechain
```

Create apache2 conf file in /etc/apache2/sites-available/wechain.conf and paste contents of wechain-apache2.conf file from this repo. Modify according to your needs.

Then enable site and reload apache2 `sudo a2ensite wechain.conf` and `sudo service apache2 reload`

# Production Links

## Front - React App

React app is deployed at http://kamui.tech:8033/
