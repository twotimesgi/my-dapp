import { useState } from "react";
import { useAccount, useConnect } from 'wagmi'
import  Modal  from '../UI/Modal'
import ConnectButton from "./ConnectButton";
import JazzIcon from "./JazzIcon";

function Header(props){
    const {connectors, connect} = useConnect();
    const {isConnected, address} = useAccount();
    const [showConnectModal, setShowConnectModal] = useState(false);
    return (
        <>
    <header>
      <div className='wrapper'>
        {!isConnected ? <button className="btn" onClick={()=>{setShowConnectModal(true)}}>Connect</button> : <span><span className="address">{address}</span><JazzIcon address={address}/></span>}
      </div>
    </header>
     <Modal show={showConnectModal} title="Connect your wallet" onClose={()=>{setShowConnectModal(false)}}>
          {connectors.map((connector) => 
       <ConnectButton connectorName={connector.name} onClick={() => connect({ connector })}  key={connector.id}/>
      )}     
    </Modal> 

    </>
    );
}

export default Header;
