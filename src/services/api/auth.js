import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// import { refreshUserToken } from 'redux/auth/auth-operations';
// import { getRefreshToken, getStore, getAccessToken } from 'redux/auth/auth-selector';
// import { setAccessToken, setRefreshToken } from 'redux/auth/auth-slice';

const { REACT_APP_BACKEND_URL = 'http://localhost:4000/api' } = process.env;
const instance = axios.create({
  baseURL: 'http://localhost:4000/api' || REACT_APP_BACKEND_URL,
});

// const onRequestSuccess = config => {
//   console.log('request success', config);
//   // const token = Storage.local.get('auth');
//   // if (token) {
//   //   config.headers.Authorization = `${token.token}`;
//   // }
//   return config;
// };
// const onRequestFail = error => {
//   // console.log('request error', error);
//   return Promise.reject(error);
// };
// // instance.interceptors.request.use(onRequestSuccess, onRequestFail);

// const onResponseSuccess = response => {
//   // console.log('response success', response);
//   return response;
// };
// const onResponseFail = async error => {
//   console.log('response error', error);
//   const status = error.status || error.response.status;
//   if (status === 403 || status === 401) {
//     const { refreshToken } = JSON.parse(localStorage.getItem('persist:user-token'));
//     console.log(refreshToken);

//     try {
//       // const dispatch = useDispatch();
//       // const { data } = await instance.post('/users/refresh', { refreshToken });
//       // console.log(data.refreshToken, data.accessToken);
//       // localStorage.setItem('persist:user-token', { refreshToken: data.refreshToken });
//       // console.log(data);

//       // setToken(data.accessToken);
//       // dispatch(setAccessToken(data.accessToken));
//       // dispatch(setRefreshToken(data.refreshToken));
//       refresh({ refreshToken });

//       // error.config.defaults.headers['Authorization'] = `Bearer ${data.accessToken}`;

//       return axios(error.config);
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   }
//   return Promise.reject(error);
// };
// instance.interceptors.response.use(onResponseSuccess, onResponseFail);

// instance.interceptors.response.use(
//   response => response,
//   async error => {
//     if (error.response.status === 401) {
//       const dispatch = useDispatch();

//       const { refreshToken } = JSON.parse(localStorage.getItem('persist:user-token'));

//       console.log('INTERCEPTOR');
//       // const refreshToken = useSelector(getRefreshToken);
//       console.log(refreshToken);

//       try {
//         // const dispatch = useDispatch();
//         const { data } = await instance.post('/users/refresh', { refreshToken });
//         // console.log(data.refreshToken, data.accessToken);
//         // localStorage.setItem('persist:user-token', { refreshToken: data.refreshToken });
//         console.log(data);

//         setToken(data.accessToken);
//         dispatch(setAccessToken(data.accessToken));
//         dispatch(setRefreshToken(data.refreshToken));

//         error.config.headers['Authorization'] = `Bearer ${data.accessToken}`;

//         return axios(error.config);
//       } catch (error) {
//         return Promise.reject(error);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export const setToken = (token = '') => {
  if (token) {
    return (instance.defaults.headers['Authorization'] = `Bearer ${token}`);
  }
  instance.defaults.headers['Authorization'] = '';
};

export const signup = async data => {
  const result = await instance.post('/users/signup', data);
  return result.data;
};

export const login = async data => {
  const result = await instance.post('/users/login', data);
  setToken(result.data.accessToken);
  return result.data;
};

export const refresh = async data => {
  const result = await instance.post('/users/refresh', data);
  setToken(result.data.accessToken);
  return result.data;
};

export const logout = async data => {
  const result = await instance.get('/users/logout', data);
  setToken('');
  return result.data;
};

export const getCurrentUser = async () => {
  const result = await instance.get('/users/current');
  return result.data;
};

export const getActivationKey = async email => {
  const result = await instance.get(`/users/key/${email}`);
  return result.data;
};

export const getKeyVerify = async key => {
  const result = await instance.get(`/users/verify/${key}`);
  return result.data;
};

export const saveNewPassword = async data => {
  const result = await instance.patch(`/users/password`, data);
  return result.data;
};

export const getCalorieIntake = async payload => {
  const result = await instance.post(`/daily-intake`, payload);
  return result.data;
};

export const getCalorieIntakeForUser = async payload => {
  const result = await instance.post(`/daily-intake/user`, payload);
  return result.data;
};

export default instance;
