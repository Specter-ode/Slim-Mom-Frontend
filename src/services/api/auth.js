import axios from 'axios';
const { REACT_APP_BACKEND_URL = 'http://localhost:4000/api' } = process.env;
const instance = axios.create({
  baseURL: REACT_APP_BACKEND_URL,
});
export const setToken = (token = '') => {
  if (token) {
    return (instance.defaults.headers['Authorization'] = `Bearer ${token}`);
  }
  instance.defaults.headers['Authorization'] = '';
};

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      const { refreshToken } = JSON.parse(localStorage.getItem('persist:user-token'));
      try {
        const result = await refresh({ refreshToken });
        localStorage.setItem('persist:user-token', {
          refreshToken: result.refreshToken,
          accessToken: result.accessToken,
        });
        return instance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

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
  console.log('result.data.accessToken: ', result.data.accessToken);
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
