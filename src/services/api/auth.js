import axios from 'axios';
import { refreshUserToken } from 'redux/auth/auth-operations';

const { REACT_APP_BACKEND_URL } = process.env;
const instance = axios.create({
  baseURL: REACT_APP_BACKEND_URL || 'http://localhost:4000/api',
});

instance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401) {
      const { refreshToken } = JSON.parse(localStorage.getItem('persist:user-token'));
      try {
        const { data } = await instance.post('/users/refresh', { refreshToken });
        // console.log(data.refreshToken, data.accessToken);
        // localStorage.setItem('persist:user-token', { refreshToken: data.refreshToken });
        console.log(data);

        setToken(data.accessToken);

        error.config.headers['Authorization'] = `Bearer ${data.accessToken}`;

        return axios(error.config);
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

export const signup = async data => {
  const result = await instance.post('/users/signup', data);
  return result.data;
};

export const googleSignup = async () => {
  const result = await fetch('http://localhost:4000/api/users/google');
  return result;
};

export const facebookSignup = async () => {
  await instance.get('/users/facebook');
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
  console.log(instance.defaults.headers);
  const result = await instance.get('/users/current');
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
