// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";   
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface MultisigFactoryI {
     function addWallet(address user) external;
}

contract MultiSigWallet {
    MultisigFactoryI contractFactory;
    using Counters for Counters.Counter;
    using SafeMath for uint256;
    IERC20 public token;

    // The balance of the wallet
    uint256 public walletBalance;
    // The majority reqired in %
    uint256 majorityRequired;

    enum Vote{ DEFAULT, APPROVE, REJECT }
    enum Operation{ CREATE, DISPOSE,  DEPOSIT, WITHDRAWAL, REMOVEUSER, ADDUSER }
    enum Status{ PENDING, EXECUTED, REJECTED }

    struct Transaction{
        uint256 amount;
        uint256 date;
        address to;
        address from;
        Operation operationCode; 
        Status operationStatus;
        mapping(address => Vote) votes;
        Counters.Counter voteCounter;
    }

    mapping(uint256 => Transaction) public transactions;
    Counters.Counter public transactionsCounter;

    address[] private users;

    modifier OnlyWalletUser{
        bool isUser = false;
        for(uint256 i = 0; i < users.length; i++){
            if(users[i] == msg.sender) isUser = true;
        }

        require(isUser, "This address is not a user of this wallet.");
        _;
    }

    constructor(IERC20 _tokenContract, address firstUser, uint256 _majorityRequired, address factory){
        contractFactory = MultisigFactoryI(factory);
        majorityRequired = _majorityRequired;
        token = _tokenContract;
        // Creating wallet creation transaction
        transactions[transactionsCounter.current()].amount = 0;
        transactions[transactionsCounter.current()].date = block.timestamp;
        transactions[transactionsCounter.current()].operationCode = Operation.CREATE;
        transactions[transactionsCounter.current()].operationStatus = Status.EXECUTED;
        users.push(firstUser);
        transactionsCounter.increment();
    }

    

    function deposit(uint256 amount) payable external{
        token.allowance(msg.sender, address(this)) >= amount;
        transactions[transactionsCounter.current()].amount = amount;
        transactions[transactionsCounter.current()].operationStatus = Status.EXECUTED;
        transactions[transactionsCounter.current()].date = block.timestamp;
        transactions[transactionsCounter.current()].operationCode = Operation.DEPOSIT;
        transactions[transactionsCounter.current()].from = msg.sender;
        transactions[transactionsCounter.current()].to = address(this);
        transactionsCounter.increment();
        walletBalance = walletBalance.add(amount);
        token.transferFrom(msg.sender, address(this), amount);
    }

    function withdraw(address _to, uint256 _amount) public OnlyWalletUser{
        require(_amount <= walletBalance,"No enough funds.");
        transactions[transactionsCounter.current()].amount = _amount;
        transactions[transactionsCounter.current()].operationStatus = Status.PENDING;
        transactions[transactionsCounter.current()].date = block.timestamp;
        transactions[transactionsCounter.current()].operationCode = Operation.WITHDRAWAL;
        transactions[transactionsCounter.current()].votes[msg.sender] = Vote.APPROVE;
        transactions[transactionsCounter.current()].from = address(this);
        transactions[transactionsCounter.current()].to = _to;
        transactions[transactionsCounter.current()].voteCounter.increment();
        executeIfApproved(transactionsCounter.current());
        transactionsCounter.increment();
    }

    function isExistingUser(address _userAddress) private view returns (bool){
        bool exists = false;
        for(uint256 i = 0; i < users.length; i++){
            if(users[i] == _userAddress) exists = true;
        }
        return exists;
    }

    function addUser(address _userAddress) public OnlyWalletUser{
        require(!isExistingUser(_userAddress),"This address is already a user.");
        transactions[transactionsCounter.current()].amount = 0;
        transactions[transactionsCounter.current()].operationStatus = Status.PENDING;
        transactions[transactionsCounter.current()].to = _userAddress;
        transactions[transactionsCounter.current()].date = block.timestamp;
        transactions[transactionsCounter.current()].operationCode = Operation.ADDUSER;
        transactions[transactionsCounter.current()].votes[msg.sender] = Vote.APPROVE;
        transactions[transactionsCounter.current()].voteCounter.increment();
        executeIfApproved(transactionsCounter.current());
        transactionsCounter.increment();
        contractFactory.addWallet(_userAddress);
    }

    function removeUser(address _userAddress) public OnlyWalletUser{
        require(isExistingUser(_userAddress),"This user address does not exists.");
        transactions[transactionsCounter.current()].amount = 0;
        transactions[transactionsCounter.current()].operationStatus = Status.PENDING;
        transactions[transactionsCounter.current()].to = _userAddress;
        transactions[transactionsCounter.current()].date = block.timestamp;
        transactions[transactionsCounter.current()].operationCode = Operation.REMOVEUSER;
        transactions[transactionsCounter.current()].votes[msg.sender] = Vote.APPROVE;
        transactions[transactionsCounter.current()].voteCounter.increment();
        executeIfApproved(transactionsCounter.current());
        transactionsCounter.increment();
    }

    function vote(uint256 _id, bool _approve) public OnlyWalletUser{
        require(transactions[_id].operationStatus != Status.REJECTED, "This operation has already been rejected.");
        require(transactions[_id].operationStatus != Status.EXECUTED, "This operation has already been executed.");
        require(transactions[_id].votes[msg.sender] == Vote.DEFAULT , "You already voted for this transaction.");
        transactions[_id].votes[msg.sender] = _approve ? Vote.APPROVE : Vote.REJECT;
        transactions[_id].voteCounter.increment();
        executeIfApproved(_id);
    }

    function getUsers() public view returns (address[] memory){
        return users;
    }

    function executeIfApproved(uint256 _id) public {
            uint256 approvals;
            uint256 denials;

            for(uint256 i = 0; i < transactions[_id].voteCounter.current(); i++){
                if(transactions[_id].votes[users[i]] == Vote.APPROVE) approvals = approvals.add(1);
                if(transactions[_id].votes[users[i]] == Vote.REJECT) denials = denials.add(1);
            }
                    
            if((approvals * 100) / users.length >= majorityRequired){
                transactions[_id].operationStatus = Status.EXECUTED;
                execute(_id);
            }else if((denials * 100) / users.length > 100 - majorityRequired){
                transactions[_id].operationStatus = Status.REJECTED;
            }
    }

    function execute(uint256 _id) private{
        if(transactions[_id].operationCode == Operation.WITHDRAWAL){
            payable(transactions[_id].to).transfer(transactions[_id].amount);
            walletBalance = walletBalance.sub(transactions[_id].amount);
        }

        if(transactions[_id].operationCode == Operation.ADDUSER){
            users.push(transactions[_id].to);
        }

        if(transactions[_id].operationCode == Operation.REMOVEUSER){
            uint256 index = 0; 
            bool found = false;

            for(uint256 i = 0; i < users.length; i++){
                if(users[i] == transactions[_id].to){
                    found = true;
                    index = i;
                }
            }

            if(found){
                users[index] = users[users.length - 1];
                users.pop();
            }
        }
    }

    function getUserVote(uint256 _id, address _userAddress) public view returns (Vote){
        return transactions[_id].votes[_userAddress];
    }
}