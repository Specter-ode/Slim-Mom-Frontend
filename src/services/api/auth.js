import axios from 'axios';
const { BACKEND_URL } = process.env;
const instance = axios.create({
  baseURL: BACKEND_URL || 'http://localhost:4000/',
});

const setToken = (token = '') => {
  if (token) {
    return (instance.defaults.headers.authorization = `Bearer ${token}`);
  }
  instance.defaults.headers.authorization = '';
};

export const registration = async data => {
  const result = await instance.post('/users/registration', data);
  return result.data;
};

export const login = async data => {
  const result = await instance.post('/users/login', data);
  setToken(result.data.accessToken);
  return result.data;
};

export const logout = async data => {
  const result = await instance.post('/users/logout', data);
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
  const { data } = await instance.post(`/api/daily-intake`, payload);

  return data;
};

export default instance;
