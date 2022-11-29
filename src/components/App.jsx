import React, { useState } from 'react';
import { Header, BurgerMenu, Background } from 'components';
import PagesRoutes from 'PagesRoutes/PagesRoutes';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from 'redux/auth/auth-operations';
import { getAccessToken, getLoginStatus } from 'redux/auth/auth-selector';
import { useSearchParams } from 'react-router-dom';
import { setAccessToken, setRefreshToken } from 'redux/auth/auth-slice';
const App = () => {
  const [menuActive, setMenuActive] = useState(false);
  const toggleNavMenu = () => {
    setMenuActive(!menuActive);
  };
  const isLogin = useSelector(getLoginStatus);
  const accessToken = useSelector(getAccessToken);

  const [searchParams] = useSearchParams();
  const accessTokenFromURL = searchParams.get('accessToken');
  const refreshTokenFromURL = searchParams.get('refreshToken');

  useEffect(() => {
    console.log('accessTokenFromURL: ', accessTokenFromURL);
    console.log('refreshTokenFromURL: ', refreshTokenFromURL);
    if (accessTokenFromURL && refreshTokenFromURL) {
      console.log('effect');
      setAccessToken(accessTokenFromURL);
      setRefreshToken(refreshTokenFromURL);
    }
  }, [accessTokenFromURL, refreshTokenFromURL]);

  const dispatch = useDispatch();
  console.log('isLogin: ', isLogin);
  console.log('accessToken: ', accessToken);
  useEffect(() => {
    console.log('!isLogin && accessToken: ', !isLogin && accessToken);
    console.log('useEffect isLogin: ', isLogin);
    console.log('useEffect accessToken: ', accessToken);
    if (!isLogin && accessToken) {
      console.log('сработал getCurrentUser');
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
