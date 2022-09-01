import "./ConnectButton.css";
import MetamaskIcon from "../../assets/metamask-icon.svg";
import WalletConnectIcon from "../../assets/walletconnect-icon.svg";
import CoinbaseIcon from "../../assets/coinbase-icon.svg";


function ConnectButton({connectorName, onClick}) {
  return (
      <button className="connect-btn" onClick={onClick}>
        {connectorName == "MetaMask" && <img src={MetamaskIcon}></img>}
        {connectorName == "WalletConnect" && <img src={WalletConnectIcon}></img>}
        {connectorName == "Coinbase Wallet" && <img src={CoinbaseIcon}></img>}
        {connectorName}
      </button>
  );
}

export default ConnectButton;
