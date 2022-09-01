import { useState } from "react";
import Modal from './Modal'



function Withdraw({walletAddress}) {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  return (
    <>
    <button onClick={()=>setShowWithdrawModal(true)} className='btn'>Deposit funds</button>
    <Modal show={showDepositModal} onClose={()=>setShowWithdrawModal(false)} title="Deposit funds" subtitle="Send your funds to the address displayed below to deposit on this shared wallet.">
        
    </Modal>
    </>
  );
}

export default Withdraw;
