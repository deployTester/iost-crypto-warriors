pragma solidity ^0.4.17;

import "../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";
import "./Fighter.sol";

contract Game is Ownable {
    using Fighter for Fighter.Data;
    Fighter.Data[] public fighters;

    mapping (uint => address) public fighterOwners;

    function createFighter(string name, Fighter.Gender gender) public returns (uint fighterId) {
        fighterId = fighters.length;
        fighters.push(Fighter.Data(fighterId, name, gender, now, 0));
        fighterOwners[fighterId] = owner;
    }

    // function wearingItems(uint fighterId) public view returns (Fighter.Data storage) {

    // }
}