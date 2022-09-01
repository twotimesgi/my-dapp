import { useState } from "react";
import "./ConnectButton.css";
import Modal from './Modal'
import QRCodeSVG from 'qrcode.react';



function Deposit({walletAddress}) {
  const [showDepositModal, setShowDepositModal] = useState(false);
  return (
    <>
    <button onClick={()=>setShowDepositModal(true)} className='btn'>Deposit funds</button>
    <Modal show={showDepositModal} onClose={()=>setShowDepositModal(false)} title="Deposit funds" subtitle="Send your funds to the address displayed below to deposit on this shared wallet.">
        <QRCodeSVG className="qr-code" size="130" value={walletAddress}/>
        <div><span className="label">Address:</span> {walletAddress}</div>
        <div><span className="label">Network:</span> {"Polygon Mumbai Testnet"}</div>
    </Modal>
    </>
  );
}

export default Deposit;
