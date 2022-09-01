import { useAccount, useConnect, useContractEvent } from 'wagmi'
import { useEffect, useState } from 'react';
import Deposit from '../components/UI/Deposit';
import {Navigate, useParams} from 'react-router-dom'
import hideIcon from '../assets/hide.svg'
import Balance from '../components/UI/Balance'


function Wallet() {
const { address, isConnected } = useAccount();
const [ hideBalance, setHideBalance ] = useState(false);
const { walletAddress } = useParams();
return (
    <>
        {!isConnected && <Navigate to="/" /> }
        <main>
            <div className='wrapper'>
                <Balance walletAddress={walletAddress} hide={hideBalance}/>
                <div className='btn-container'>
                    <Deposit walletAddress={walletAddress}/>
                    <button className='btn'>Withdraw funds</button>
                    <button className='btn'>Manage wallet</button>
                    <img src={hideIcon} onClick={()=>{setHideBalance(!hideBalance)}}/>
                </div>
            </div>
        </main>
    </>
  );
}

export default Wallet;
