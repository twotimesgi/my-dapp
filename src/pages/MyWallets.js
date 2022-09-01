import { useAccount, useConnect, useContractEvent } from 'wagmi'
import { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi'
import {Navigate} from 'react-router-dom'
import WalletInfo from '../components/UI/WalletInfo'
import CreateWallet from '../components/UI/CreateWallet';
import Modal from '../components/UI/Modal'


function MyWallets() {
    const [showCreateWalletModal, setShowCreateWalletModal] = useState(false);
    const { address, isConnected } = useAccount();
    const { data, isError, isLoading, refetch } = useContractRead({
        addressOrName: process.env.REACT_APP_CONTRACT,
        contractInterface: [
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    }
                ],
                "name": "addWallet",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "contract IERC20",
                        "name": "tokenAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_majorityRequired",
                        "type": "uint256"
                    }
                ],
                "name": "newWallet",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "walletOwner",
                        "type": "address"
                    }
                ],
                "name": "newWalletCreated",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    }
                ],
                "name": "getUserWallets",
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
                        "name": "",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "wallets",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ],
        functionName: 'getUserWallets',
        args : [address]
    });
    

    useContractEvent({
        addressOrName: process.env.REACT_APP_CONTRACT,
        contractInterface:  [
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "walletOwner",
                        "type": "address"
                    }
                ],
                "name": "newWalletCreated",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    }
                ],
                "name": "addWallet",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    }
                ],
                "name": "getUserWallets",
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
                        "internalType": "contract IERC20",
                        "name": "tokenAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_majorityRequired",
                        "type": "uint256"
                    }
                ],
                "name": "newWallet",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "wallets",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ],
        eventName: 'newWalletCreated',
        listener: () =>{
            refetch();
        }
    })
  

  
  return (
    <>
        {!isConnected && <Navigate to="/" /> }
        <main><div className="wrapper">
        <div className='flex-between'>
            <h2 className='title'>Your shared wallets</h2>
            <button onClick={() => {setShowCreateWalletModal(true)}} className="btn">Create wallet</button>
        </div>
        <div className='flex-vertical-container'>
           {isLoading ? 
           "d" : data.map((item) =>{
            return <WalletInfo key={item} walletAddress={item}/>
           })
           }
      </div>
        </div>
      </main>
      <Modal show={showCreateWalletModal} title="Create a new shared wallet" onClose={()=>{setShowCreateWalletModal(false)}}>
      <CreateWallet></CreateWallet>
    </Modal>
    </>
  );
}

export default MyWallets;
