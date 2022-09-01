import { useAccount, useConnect } from 'wagmi'
import { useEffect, useState } from 'react';
import {Navigate} from 'react-router-dom'

function Connect() {

    const {connectors, connect} = useConnect();
    const {isConnected} = useAccount();
  
    useEffect(()=>{
       //if(isConnected) router.replace("/wallets");
     }, [isConnected]);
  
  return (
    <>
    {isConnected && <Navigate to="/mywallets" /> } 
    </>
  );
}

export default Connect;
