import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { WalletConnectConnector } from "wagmi/connectors/walletConnect"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet"
import {publicProvider} from 'wagmi/providers/public'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const {chains, provider, webSocketProvider} = configureChains([chain.polygonMumbai], [publicProvider()]);

const client = createClient({
  autoConnect: true,
  provider,
  connectors: [
    new WalletConnectConnector({...chains, options: undefined}),
    new MetaMaskConnector({...chains, options: undefined}),
    new CoinbaseWalletConnector({...chain, options: {appName: "Multisig"}})
  ]
})

root.render(
  <WagmiConfig client={client}><React.StrictMode>
    <App />
  </React.StrictMode> </WagmiConfig>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
