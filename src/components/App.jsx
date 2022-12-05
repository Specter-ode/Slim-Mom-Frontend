import React, { useState } from 'react';
import { Header, BurgerMenu, Background } from 'components';
import PagesRoutes from 'PagesRoutes/PagesRoutes';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, refreshUserToken } from 'redux/auth/auth-operations';
import { getAccessToken, getLoginStatus, getRefreshToken } from 'redux/auth/auth-selector';
import { useSearchParams } from 'react-router-dom';
import { setAccessToken, setRefreshToken } from 'redux/auth/auth-slice';
import instance, { setToken } from 'services/api/auth';

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
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessTokenFromURL && refreshTokenFromURL) {
      dispatch(setAccessToken(accessTokenFromURL));
      dispatch(setRefreshToken(refreshTokenFromURL));
    }
  }, [accessTokenFromURL, refreshTokenFromURL]);

  useEffect(() => {
    if (!isLogin && accessToken) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, isLogin, accessToken]);

  // instance.interceptors.request.use(
  //   config => {
  //     console.log('config');

  //     config.headers.authorization = `Bearer ${accessToken}`;
  //     return config;
  //   },
  //   error => {
  //     console.log('error');
  //     return Promise.reject(error);
  //   }
  // );

  instance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const { refreshToken } = JSON.parse(localStorage.getItem('persist:user-token'));

        console.log('INTERCEPTOR');

        try {
          // const dispatch = useDispatch();
          // const { data } = await instance.post('/users/refresh', { refreshToken });
          // console.log(data.refreshToken, data.accessToken);
          // localStorage.setItem('persist:user-token', { refreshToken: data.refreshToken });

          // setToken(data.accessToken);
          // dispatch(setAccessToken(data.accessToken));
          // dispatch(setRefreshToken(data.refreshToken));
          dispatch(refreshUserToken({ refreshToken }));
          console.log('originalRequest before', originalRequest.headers.authorization);

          originalRequest.headers.authorization = `Bearer ${accessToken}`;
          // instance.defaults.headers['Authorization'] = `Bearer ${data.accessToken}`;
          console.log('originalRequest after', originalRequest.headers.authorization);

          return instance(originalRequest);
        } catch (error) {
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );

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
