var WarriorFactory = artifacts.require("WarriorFactory.sol");
var WarriorHelper = artifacts.require("WarriorHelper.sol");

module.exports = function (deployer) {
    deployer.deploy(WarriorFactory);
    deployer.deploy(WarriorHelper);
};