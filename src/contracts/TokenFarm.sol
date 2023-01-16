pragma solidity ^0.5.0;

import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm {
    string public name = "Dapp Token Farm";
    DappToken public dappToken;
    DaiToken public daiToken;

    address[] public staker;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasstaked;

    constructor(DappToken _dappToken, DaiToken _daiToken) public{
        dappToken = _dappToken;
        daiToken = _daiToken;
    }

    // Stake Tokens(Deposit)
    function stakeTokens(uint _amount) public {
        // Transfer Mock Dai Token to this contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);

        // Update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount; 
    }

    // Unstake tokens(Withdraw)

    // Issuing Tokens
} 