pragma solidity ^0.4.17;

import "../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";
import "./Fighter.sol";

contract Game is Ownable {
    using Fighter for Fighter.Data;
    Fighter.Data[] public fighters;

    mapping (uint => address) public fighterOwners;

    function createFighter(string name, uint8 gender) public {
        uint fighterId = fighters.length;
        fighters.push(Fighter.Data(fighterId, name, Fighter.Gender(gender), now, 0));
        fighterOwners[fighterId] = owner;
    }
}