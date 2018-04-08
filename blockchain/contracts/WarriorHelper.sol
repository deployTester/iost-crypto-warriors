pragma solidity ^0.4.17;

import "./WarriorFactory.sol";

contract WarriorHelper is WarriorFactory {
    function power(uint warriorId) public view returns (uint wearingPower) {
        Warrior storage warrior = warriors[warriorId];
        for (uint8 i = 0; i < uint8(BodyPart.End); i++) {
            wearingPower += warrior.wearingItems[i].power;
        }
    }

    function numberOfItemsInBag(uint warriorId) public view returns (uint availableItemsCount) {
        Warrior storage warrior = warriors[warriorId];
        for (uint i = 0; i < warrior.itemCount; i++) {
            Item storage item = warrior.items[i];
            if (item.isAvailable && !item.isWearing) {
                availableItemsCount += 1;
            }
        }
    }
}