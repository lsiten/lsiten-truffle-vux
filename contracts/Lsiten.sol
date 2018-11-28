pragma solidity ^0.4.23;

contract Lsiten {
  address ower;
  uint testId = 1;
  constructor() public {
    ower = msg.sender;
  }
  modifier _checkower() {
    if (msg.sender == ower) _;
  }

  function addTestId () public _checkower {
    testId++;
  }

  function lsitenGetTestId () public view _checkower returns (uint) {
    return testId;
  } 
}
