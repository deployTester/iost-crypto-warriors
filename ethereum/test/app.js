console.log('test...');

const fs = require('fs');
const file = 'ethereum/build/contracts/Game.json';
const json = JSON.parse(fs.readFileSync(file));
console.log(json);
const abi = json['abi'];
console.log(abi);

