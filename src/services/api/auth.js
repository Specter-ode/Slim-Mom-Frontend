import axios from 'axios';
const { BACKEND_URL = 'http://localhost:4000/api' } = process.env;
const instance = axios.create({
  baseURL: BACKEND_URL,
});

export const setToken = (token = '') => {
  if (token) {
    return (instance.defaults.headers.authorization = `Bearer ${token}`);
  }
  instance.defaults.headers.authorization = '';
};

export const signup = async data => {
  const result = await instance.post('/users/signup', data);
  return result.data;
};

export const googleSignup = async () => {
  await instance.get('/users/google');
};

export const facebookSignup = async () => {
  await instance.get('/users/facebook');
};

export const login = async data => {
  const result = await instance.post('/users/login', data);
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

export const getCalorieIntake = async payload => {
  const result = await instance.post(`/daily-intake`, payload);
  return result.data;
};

export const getCalorieIntakeForUser = async payload => {
  const result = await instance.post(`/daily-intake/user`, payload);
  return result.data;
};

export default instance;
