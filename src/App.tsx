import './fonts.css';
import './global.css';

import { useRef } from 'react'; // Импортируем useRef

import Header from './components/sections/Header';
import Catalog from './components/sections/Catalog';
import { RootStoreContext } from './Context/rootStoreContext';
import RootStore from './stores/RootStore';
import About from './components/sections/About';

import { ToastContainer } from 'react-toastify';
import CartModal from './components/features/cart/CartModal';
import Footer from './components/sections/Footer';
import Faq from './components/sections/faq';

function App() {
  // Используем useRef для создания и сохранения экземпляра хранилища
  const storeRef = useRef(new RootStore());
  // Благодаря useRef, значение сохраняется между рендерами

  return (
    // Передаем .current, так как useRef возвращает объект { current: значение }
    <RootStoreContext.Provider value={storeRef.current}>

      <Header />
      <main className="main">
        <Catalog />
        <About />
        <Faq />
      </main>
      <Footer />

      {/* Toast контейнер */}
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