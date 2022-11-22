import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api/auth';
import { toast } from 'react-toastify';

export const handleRegistration = createAsyncThunk(
  'auth/registration',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.registration(data);
      return result;
    } catch (error) {
      toast.error(`Sorry, registration failed. Try again.`);
      return rejectWithValue(error);
    }
  }
);

export const handleLogin = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
  try {
    const result = await api.login(data);
    return result;
  } catch (error) {
    toast.error(`Sorry, login failed. Check email and password. Try again.`);
    return rejectWithValue(error);
  }
});

export const handleLogout = createAsyncThunk('auth/logout', async (data, { rejectWithValue }) => {
  try {
    const result = await api.logout(data);
    return result;
  } catch (error) {
    toast.error(`Sorry, registration failed. Try again.`);
    return rejectWithValue(error);
  }
});

export const getCurrentUser = createAsyncThunk(
  'auth/current-user',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const result = await api.getCurrentUser(auth.token);
      return result;
    } catch (error) {
      return rejectWithValue(
        error,
        toast.error(
          'Sorry, request failed. May be you have problems with network or token timed out '
        )
      );
    }
  },
  {
    condition: (_, thunkAPI) => {
      const { auth } = thunkAPI.getState();
      if (!auth.token) return false;
    },
  }
);
