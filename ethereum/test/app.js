console.log('test...');

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
console.log(web3);
console.log(web3.version);
web3.eth.getAccounts().then(accounts=> {
    console.log(accounts[0]);
});
web3.eth.net.getId().then(console.log);
web3.eth.getGasPrice().then(console.log);

const fs = require('fs');
const file = 'ethereum/build/contracts/Game.json';
const json = JSON.parse(fs.readFileSync(file));
console.log(json);
const abi = json['abi'];
console.log(abi);

