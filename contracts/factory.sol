// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "./multisig.sol";

contract MultisigFactory{
    mapping(address => address[]) public wallets;
    mapping(address => bool) isWhitelisted;
    
    event newWalletCreated(address indexed walletOwner);

    modifier onlyWhitelisted{
        require(isWhitelisted[msg.sender], "Not allowed.");
        _;
    }

    function newWallet(IERC20 tokenAddress, uint256 _majorityRequired) public {
        MultiSigWallet wallet = new MultiSigWallet(tokenAddress, msg.sender, _majorityRequired, address(this));
        wallets[msg.sender].push(address(wallet));
        isWhitelisted[address(wallet)] = true;
        emit newWalletCreated(msg.sender);
    }

    function getUserWallets(address user) public view returns(address[] memory){
        return wallets[user];
    }

    function addWallet(address user) external onlyWhitelisted{
        wallets[user].push(address(msg.sender));
    }
}