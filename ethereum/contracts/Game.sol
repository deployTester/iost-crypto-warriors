pragma solidity ^0.4.17;

import "../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";
import "./Fighter.sol";

contract Game is Ownable {
    using Fighter for Fighter.Data;
    Fighter.Data[] public fighters;

    mapping (uint => address) public fighterOwners;

    function createFighter(string name, uint8 gender) public returns (uint fighterId) {
        fighterId = fighters.length;
        fighters.push(Fighter.Data(fighterId, name, Fighter.Gender(gender), now, 0));
        fighterOwners[fighterId] = owner;
    }

    function pushFighter(string name) public {
        fighters.push(Fighter.Data(1, name, Fighter.Gender.Male, now, 0));
    }

    function age() public pure returns (uint) {
        return 42;
    }
}