import "./Balance.css";
import {useAccount, useContractRead} from 'wagmi'

function Balance({hide, walletAddress}) {
    const { address, isConnected } = useAccount();
    const { data, isError, isLoading, refetch } = useContractRead({
        addressOrName: walletAddress,
        contractInterface: [
            {
                "inputs": [
                    {
                        "internalType": "contract IERC20",
                        "name": "_tokenContract",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "firstUser",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_majorityRequired",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "factory",
                        "type": "address"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_userAddress",
                        "type": "address"
                    }
                ],
                "name": "addUser",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                    }
                ],
                "name": "executeIfApproved",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "_userAddress",
                        "type": "address"
                    }
                ],
                "name": "getUserVote",
                "outputs": [
                    {
                        "internalType": "enum MultiSigWallet.Vote",
                        "name": "",
                        "type": "uint8"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getUsers",
                "outputs": [
                    {
                        "internalType": "address[]",
                        "name": "",
                        "type": "address[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_userAddress",
                        "type": "address"
                    }
                ],
                "name": "removeUser",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "token",
                "outputs": [
                    {
                        "internalType": "contract IERC20",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "transactions",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "date",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "enum MultiSigWallet.Operation",
                        "name": "operationCode",
                        "type": "uint8"
                    },
                    {
                        "internalType": "enum MultiSigWallet.Status",
                        "name": "operationStatus",
                        "type": "uint8"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "_value",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct Counters.Counter",
                        "name": "voteCounter",
                        "type": "tuple"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "transactionsCounter",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "_approve",
                        "type": "bool"
                    }
                ],
                "name": "vote",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "walletBalance",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_amount",
                        "type": "uint256"
                    }
                ],
                "name": "withdraw",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "stateMutability": "payable",
                "type": "receive"
            }
        ],
        functionName: 'walletBalance'
    });
  return (
    <div className="balance-container">
      <div className={'balance ' + (hide ? 'hidden' : '')}>
       {/* { isLoading ? "Loading..." : data.toString()} */}
       { (12954.5).toLocaleString()}
      </div>
      <div className="currency">USDT</div>
      </div>
  );
}

export default Balance;
