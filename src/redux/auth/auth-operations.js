import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api/auth';
import { toast } from 'react-toastify';

export const handleRegistration = createAsyncThunk(
  'users/signup',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.signup(data);
      toast.success(`Registration is success.`);
      return result;
    } catch (error) {
      toast.error(`Sorry, registration failed. Try again.`);
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const handleLogin = createAsyncThunk('users/login', async (data, { rejectWithValue }) => {
  try {
    const result = await api.login(data);
    return result;
  } catch (error) {
    toast.error(
      error?.response?.data?.message || 'Sorry, login failed. Check email and password. Try again.'
    );
    return rejectWithValue(error.response.data.message || error.message);
  }
});

export const refreshUserToken = createAsyncThunk(
  'users/refresh',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.refresh(data);
      return result;
    } catch (error) {
      toast.error(`Sorry, refresh failed.`);
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const handleLogout = createAsyncThunk('users/logout', async (data, { rejectWithValue }) => {
  try {
    const result = await api.logout(data);
    return result;
  } catch (error) {
    toast.error(`Sorry, registration failed. Try again.`);
    return rejectWithValue(error.message);
  }
});

export const getCurrentUser = createAsyncThunk(
  'users/current',
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.getCurrentUser();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      if (!state.auth.accessToken) {
        return false;
      }
      api.setToken(state.auth.accessToken);
    },
  }
);

export const getCalorieIntake = createAsyncThunk('daily-intake', async (payload, thunkAPI) => {
  try {
    const result = await api.getCalorieIntake(payload);
    return result;
  } catch (error) {
    toast.error(`Sorry, request failed.`);
    return thunkAPI.rejectWithValue(error.response.data.message || error.message);
  }
});

export const getCalorieIntakeForUser = createAsyncThunk(
  'daily-intake/user',
  async (payload, thunkAPI) => {
    try {
      const result = await api.getCalorieIntakeForUser(payload);
      return result;
    } catch (error) {
      toast.error(`Sorry, request failed.`);
      return thunkAPI.rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const saveNewPassword = createAsyncThunk(
  'users/password',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.saveNewPassword(data);
      toast.success('New password saved in database');
      return result;
    } catch (error) {
      toast.error(`Request failed. Password didn't save. Try again.`);
      return rejectWithValue(error.message);
    }
  }
);

export const getKeyVerify = createAsyncThunk('users/key', async (data, { rejectWithValue }) => {
  try {
    const result = await api.getKeyVerify(data);
    return result;
  } catch (error) {
    toast.error(`Key is wrong.`);
    return rejectWithValue(error.message);
  }
});

export const getActivationKey = createAsyncThunk(
  'users/email',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.getActivationKey(data);
      return result;
    } catch (error) {
      toast.error(`Can't find email`);
      return rejectWithValue(error.message);
    }
  }
);
