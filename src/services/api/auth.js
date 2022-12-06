import axios from 'axios';
// import { getStore } from '../../redux/auth/auth-selector';
// import { useSelector } from 'react-redux';

const { REACT_APP_BACKEND_URL = 'http://localhost:4000/api' } = process.env;
const instance = axios.create({
  baseURL: REACT_APP_BACKEND_URL,
});

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
//     if (error.response.status === 40) {
//       // const dispatch = useDispatch();

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

//         // setToken(data.accessToken);
//         // dispatch(setAccessToken(data.accessToken));
//         // dispatch(setRefreshToken(data.refreshToken));

//         error.config.headers['Authorization'] = `Bearer ${data.accessToken}`;

//         return axios(error.config);
//       } catch (error) {
//         return Promise.reject(error);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    // console.log(error);
    if (error.response?.status === 401 && !originalRequest._retry) {
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
        // // dispatch(setRefreshToken(data.refreshToken));
        // dispatch(refreshUserToken({ refreshToken }));

        const data = await refresh({ refreshToken });
        console.log('result', data.accessToken);

        // "\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzN2UyZGE2OGU4NjhiYzNlMWMyZWY4MiIsImlhdCI6MTY3MDI1ODAzNCwiZXhwIjoxNjcwMjU4MDQ5fQ.u3YB5NPDB3qhk0LJ-O46DlN-GdB3NVOwbdtcnpdFCI8\"";
        // "\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzN2UyZGE2OGU4NjhiYzNlMWMyZWY4MiIsImlhdCI6MTY3MDI1OTEwMCwiZXhwIjoxNjcwODYzOTAwfQ.OMQOBmIs4xAKrajZY4UFxUi7SzFewzeCplU6UeBwi4c\"\""

        // localStorage.setItem(
        //   'persist:user-token',
        //   JSON.stringify({
        //     refreshToken: `\"${data.refreshToken}"`,
        //     accessToken: `\"${data.accessToken}"`,
        //     _persist: '{"version":-1,"rehydrated":true}',
        //   })
        // );
        // console.log('originalRequest', originalRequest);
        console.log('originalRequest before', originalRequest.headers['Authorization']);

        // originalRequest.headers.authorization = `Bearer ${accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        // setToken(data.accessToken);
        console.log('originalRequest after', originalRequest.headers['Authorization']);
        const res = instance(originalRequest).then(a => a);
        console.log(res);

        return instance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export const setToken = (token = '') => {
  if (token) {
    return (instance.defaults.headers['Authorization'] = `Bearer ${token}`);
  }
  instance.defaults.headers['Authorization'] = '';
};

// instance.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;
//     if (error.response.status === 401) {
//       const { refreshToken } = JSON.parse(localStorage.getItem('persist:user-token'));
//       try {
//         const result = await refresh({ refreshToken });
//         localStorage.setItem('persist:user-token', {
//           refreshToken: result.refreshToken,
//           accessToken: result.accessToken,
//         });
//         return instance(originalRequest);
//       } catch (error) {
//         return Promise.reject(error);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

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
