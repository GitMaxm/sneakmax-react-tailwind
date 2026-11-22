import './fonts.css';
import './global.css';

import { useRef } from 'react';

import Header from './components/sections/Header';
import Catalog from './components/sections/Catalog';
import { RootStoreContext } from './Context/rootStoreContext';
import RootStore from './stores/RootStore';
import About from './components/sections/About';

import { ToastContainer } from 'react-toastify';
import CartModal from './components/features/cart/CartModal';
import Footer from './components/sections/Footer';
import Faq from './components/sections/Faq';

function App() {
  const storeRef = useRef(new RootStore());

  return (
    <RootStoreContext.Provider value={storeRef.current}>
      <Header />
      <main className="main">
        <Catalog />
        <About />
        <Faq />
      </main>
      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <CartModal />
    </RootStoreContext.Provider>
  );
}

export default App;
