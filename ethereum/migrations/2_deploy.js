var Fighter = artifacts.require("Fighter.sol");
var Game = artifacts.require("Game.sol");

module.exports = function (deployer) {
    deployer.deploy(Fighter);
    deployer.deploy(Game);
};