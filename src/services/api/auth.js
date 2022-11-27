import axios from 'axios';
const { BACKEND_URL = 'http://localhost:4000/api' } = process.env;
const instance = axios.create({
  baseURL: BACKEND_URL,
});

const setToken = (token = '') => {
  console.log('instance.defaults.headers.authorization: ', instance.defaults.headers.authorization);
  if (token) {
    return (instance.defaults.headers.authorization = `Bearer ${token}`);
  }
  instance.defaults.headers.authorization = '';
};

export const signup = async data => {
  console.log('data: ', data);
  const result = await instance.post('/users/signup', data);
  console.log('result: ', result);
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
  console.log(' login result: ', result);
  setToken(result.data.accessToken);
  return result.data;
};

export const logout = async data => {
  const result = await instance.get('/users/logout', data);
  setToken('');
  return result.data;
};

export const getCurrentUser = async () => {
  try {
    const result = await instance.get('/users/current');
    return result.data;
  } catch (error) {
    setToken('');
    throw error;
  }
};

export const getCalorieIntake = async payload => {
  const { data } = await instance.post(`/daily-intake`, payload);
  return data;
};

export const getCalorieIntakeForUser = async payload => {
  const { data } = await instance.post(`/daily-intake/user`, payload);
  return data;
};

export default instance;
