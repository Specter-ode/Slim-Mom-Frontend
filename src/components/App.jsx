import React, { useState } from 'react';
import { Header, BurgerMenu, Background } from 'components';
import PagesRoutes from 'PagesRoutes/PagesRoutes';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from 'redux/auth/auth-operations';

const App = () => {
  const [menuActive, setMenuActive] = useState(false);
  const toggleNavMenu = () => {
    setMenuActive(!menuActive);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  return (
    <>
      <Background>
        <Header menuActive={menuActive} setMenuActive={setMenuActive} />
        {menuActive && <BurgerMenu toggleNavMenu={toggleNavMenu} />}
        <PagesRoutes />
      </Background>
      <ToastContainer
        autoClose={2000}
        hideProgressBar
        position="top-center"
        theme="colored"
        transition={Zoom}
      />
    </>
  );
};
export default App;
