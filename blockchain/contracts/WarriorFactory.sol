pragma solidity ^0.4.17;

import "../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";
import "./oraclize/oraclizeAPI.sol";

contract WarriorFactory is Ownable, usingOraclize {
    enum BodyPart { Weapon, Clothes, Belt, LeftRing, RightRing, End }

    struct Item {
        BodyPart bodyPart;
        uint power;
        bool isAvailable;
        bool isWearing;
    }

    enum Gender { Male, Female }

    struct Warrior { 
        uint id;
        string name;
        Gender gender;
        uint readyTime;
        uint itemCount;
        mapping(uint => Item) items; // key is index
        mapping(uint8 => Item) wearingItems; // key is BodyPart
    }

    Warrior[] public warriors;
    bytes32 queryId;
    uint randomNumber;

    function WarriorFactory() public {
        oraclize_setProof(proofType_Ledger);
        update();
    }

    function update() public payable {
        uint N = 7; // number of random bytes we want the datasource to return
        uint delay = 0; // number of seconds to wait before the execution takes place
        uint callbackGas = 200000; // amount of gas we want Oraclize to set for the callback function
        queryId = oraclize_newRandomDSQuery(delay, N, callbackGas); // this function internally generates the correct oraclize_query and returns its queryId
    }

    function __callback(bytes32 _queryId, string _result, bytes _proof) public
    { 
        require(msg.sender != oraclize_cbAddress());
        
        if (oraclize_randomDS_proofVerify__returnCode(_queryId, _result, _proof) != 0) {
            // the proof verification has failed, do we need to take any action here? (depends on the use case)
        } else {
            // the proof verification has passed
            // now that we know that the random number was safely generated, let's use it..
            
            // newRandomNumber_bytes(bytes(_result)); // this is the resulting random number (bytes)
            
            // for simplicity of use, let's also convert the random bytes to uint if we need
            uint maxRange = 10;//2**(8* 7); // this is the highest uint we want to get. It should never be greater than 2^(8*N), where N is the number of random bytes we had asked the datasource to return
            randomNumber = uint(keccak256(_result)) % maxRange; // this is an efficient way to get the uint out in the [0, maxRange] range
            
            // newRandomNumber_uint(randomNumber); // this is the resulting random number (uint)
        }
    }

    // modifier hasVacancy(Data storage self) {        
    //     require(numberOfItems(self) < 20);
    //     _;
    // }

    // modifier isReady(Data storage self) {        
    //     require(self.readyTime <= now);
    //     _;
    // }

    // function obtainItem(uint warriorId) public hasVacancy(self) isReady(self) returns (uint itemId) {
    //     uint seed = uint(keccak256(now));
    //     uint bodyPart = seed % uint(BodyPart.End);
    //     uint thepower = uint(keccak256(seed)) % 100;
    //     itemId = self.itemCount++;
    //     self.items[itemId] = Item(BodyPart(bodyPart), thepower, true, false);
    //     self.readyTime = uint32(now + 1 hours);
    // }

    // function putOnItem(Data storage self, uint itemId) public {
    //     Item storage item = self.items[itemId];
    //     Item storage oldItem = self.partToItem[uint8(item.bodyPart)];
    //     if (oldItem.isWearing) {
    //         oldItem.isWearing = false;
    //     }
    //     item.isWearing = true;
    // }

    // function discardItem(Data storage self, uint itemId) public {
    //     Item storage item = self.items[itemId];
    //     require(item.isAvailable && !item.isWearing);
    //     item.isAvailable = false;
    // }
}