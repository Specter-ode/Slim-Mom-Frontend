import { createSlice } from '@reduxjs/toolkit';
// import { register, login, logout, getCurrentUser } from './auth-operations';

const initialState = {
  user: {},
  accessToken: '',
  refreshToken: '',
  isLogin: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {},
});

export default authSlice.reducer;
