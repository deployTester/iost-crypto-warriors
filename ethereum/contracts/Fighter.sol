pragma solidity ^0.4.17;

library Fighter {
    enum BodyPart { Weapon, Clothes, Belt, LeftRing, RightRing, End }

    struct Item {
        BodyPart bodyPart;
        uint power;
        bool isAvailable;
        bool isWearing;
    }

    enum Gender { Male, Female }

    struct Data { 
        uint id;
        string name;
        Gender gender;
        uint readyTime;
        uint itemCount;
        mapping(uint => Item) items; // key is index
        mapping(uint8 => Item) partToItem; // key is BodyPart
    }

    modifier hasVacancy(Data storage self) {        
        require(numberOfItems(self) < 20);
        _;
    }

    modifier isReady(Data storage self) {        
        require(self.readyTime <= now);
        _;
    }

    function numberOfItems(Data storage self) public view returns (uint availableItemsCount) {
        for (uint i = 0; i < self.itemCount; i++) {
            Item storage item = self.items[i];
            if (item.isAvailable && !item.isWearing) {
                availableItemsCount += 1;
            }
        }
    }

    function power(Data storage self) public view returns (uint wearingPower) {
        for (uint8 i = 0; i < uint8(BodyPart.End); i++) {
            wearingPower += self.partToItem[i].power;
        }
    }

    function obtainItem(Data storage self) public hasVacancy(self) isReady(self) returns (uint itemId) {
        uint seed = uint(keccak256(now));
        uint bodyPart = seed % uint(BodyPart.End);
        uint thepower = uint(keccak256(seed)) % 100;
        itemId = self.itemCount++;
        self.items[itemId] = Item(BodyPart(bodyPart), thepower, true, false);
        self.readyTime = uint32(now + 1 hours);
    }

    function putOnItem(Data storage self, uint itemId) public {
        Item storage item = self.items[itemId];
        Item storage oldItem = self.partToItem[uint8(item.bodyPart)];
        if (oldItem.isWearing) {
            oldItem.isWearing = false;
        }
        item.isWearing = true;
    }

    function discardItem(Data storage self, uint itemId) public {
        Item storage item = self.items[itemId];
        require(item.isAvailable && !item.isWearing);
        item.isAvailable = false;
    }
}