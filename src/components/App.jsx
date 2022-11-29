import React, { useState } from 'react';
import { Header, BurgerMenu, Background } from 'components';
import PagesRoutes from 'PagesRoutes/PagesRoutes';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from 'redux/auth/auth-operations';
import { getAccessToken, getLoginStatus } from 'redux/auth/auth-selector';

const App = () => {
  const [menuActive, setMenuActive] = useState(false);
  const toggleNavMenu = () => {
    setMenuActive(!menuActive);
  };
  const isLogin = useSelector(getLoginStatus);
  const accessToken = useSelector(getAccessToken);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLogin && accessToken) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, isLogin, accessToken]);
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
