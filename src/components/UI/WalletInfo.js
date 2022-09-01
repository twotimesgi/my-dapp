import "./WalletInfo.css";
import ChevronRight from '../../assets/chevron-right.svg';
import { Link } from "react-router-dom";


function WalletInfo({walletAddress}) {
  return (
    <Link className="wallet-link" to={"/wallet/"+ walletAddress}><div className="wallet-info">
        {walletAddress}
        <img src={ChevronRight}></img>
    </div>
    </Link>
  );
}

export default WalletInfo;
