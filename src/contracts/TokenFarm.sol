pragma solidity ^0.5.0;

import "./DaiToken.sol";
import "./DappToken.sol";

contract TokenFarm {
    string public name = "Dapp Token Farm";
    DappToken public _dappToken;
    DaiToke public _daiToken;

    constructor(DappToken _dappToken, DaiToke _daiToken) public{
        dappToken = _dappToken;
        daiToken - _daiToken;
    }
} 