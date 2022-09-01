import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import react, {useState} from 'react';

function CreateWallet() {
    const [tokenAddress, setTokenAddress] = useState("");
    const [majorityRequired, setMajorityRequired] = useState(51); 
    const { config } = usePrepareContractWrite({
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
        functionName: 'newWallet',
        args: [tokenAddress, majorityRequired]
      })
      const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <>
    <input value={tokenAddress} placeholder="Token address" type="text" onChange={(e)=>{setTokenAddress(e.target.value)}}></input>
    <input value={majorityRequired} placeholder="Majority required" type="number" onChange={(e)=>{setMajorityRequired(e.target.value)}}></input>
    <button className="btn" disabled={!write || isLoading}
    onClick={() => {write?.(); console.log(tokenAddress, majorityRequired)}}>
        Confirm
      </button>  
    </>
  );
}

export default CreateWallet;
