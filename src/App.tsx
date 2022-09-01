
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connect from './pages/Connect';
import MyWallets from './pages/MyWallets';
import Wallet from './pages/Wallet';
import { Outlet } from "react-router-dom";
import Header from './components/UI/Header'

function App() {


  return (
    <>
      <Header/>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Connect />} />
        <Route path="mywallets" element={<MyWallets />} />
        <Route path="wallet" element={<Wallet />} >
          <Route path=":walletAddress"/>
        </Route>
        {/* <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NoPage />} /> */}
    </Routes>
  </BrowserRouter>
  <Outlet />
  </>
  );
}


export default App;
