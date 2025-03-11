import { Routes, Route } from 'react-router-dom';
import Season from '../pages/Season';
import Search from '../pages/Search';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Auth from '../pages/Auth';
import Account from '../pages/Account';
import AlertBanner from './AlertBanner';
// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useAlert } from '../../util/AlertContext';

function MainBody({ mainView }) {
  // const location = useLocation();
  // const { showAlert } = useAlert();

  // Clears banner on main page changes
  // useEffect(() => {
  //   showAlert('', '');
  // }, [location.pathname]);

  return (
    <main id="main-body">
      <AlertBanner />
      <Routes>
        <Route path="/" element={<Season />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth/:authType" element={<Auth />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </main>
  );
}

export default MainBody;
