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
console.log('json:', json);
const abi = json['abi'];
console.log('abi:', abi);
// for (obj of abi) {
//     console.log(obj);
// }

const game = new web3.eth.Contract(
    abi, 
    "0x2c2b9c9a4a25e24b174f26114e8926a9f2128fe4"
)
console.log(game);
game.methods.fighters(0).call()
.then(console.log);

// game.methods.age().call().then(console.log);

game.methods.createFighter('dong', 0).estimateGas({from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57'})
.then(function(gasAmount){
    console.log('gasAmount', gasAmount);
})
.catch(function(error){
    console.log(error);
});

game.methods.createFighter('dong', 0).send({from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57', gas: 200000})
// game.methods.pushFighter('dong').send({from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57'})
.on('transactionHash', function(hash) {
    console.log('transactionHash', hash);
})
.on('confirmation', function(confirmationNumber, receipt) {
    console.log('confirmation', confirmationNumber, receipt);
})
.on('receipt', function(receipt) {
    console.log('receipt', receipt);
})
.on('error', console.error);
