import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api/auth';
import { toast } from 'react-toastify';

export const handleRegistration = createAsyncThunk(
  'users/signup',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.signup(data);
      return result;
    } catch (error) {
      toast.error(`Sorry, registration failed. Try again.`);
      return rejectWithValue(error.message);
    }
  }
);

export const handleGoogleRegistration = createAsyncThunk(
  'users/google',
  async (_, { rejectWithValue }) => {
    try {
      await api.googleSignup();
    } catch (error) {
      toast.error(`Sorry, registration failed. Try again.`);
      return rejectWithValue(error.message);
    }
  }
);
export const handleFacebookRegistration = createAsyncThunk(
  'users/facebook',
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.facebookSignup();
      console.log('result handleFacebookRegistration: ', result);
    } catch (error) {
      toast.error(`Sorry, registration failed. Try again.`);
      return rejectWithValue(error.message);
    }
  }
);
export const handleLogin = createAsyncThunk('users/login', async (data, { rejectWithValue }) => {
  try {
    const result = await api.login(data);
    console.log('result: ', result);
    return result;
  } catch (error) {
    toast.error(`Sorry, login failed. Check email and password. Try again.`);
    return rejectWithValue(error.message);
  }
});

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
      return rejectWithValue(
        error.message,
        toast.error(
          'Sorry, request failed. May be you have problems with network or token timed out '
        )
      );
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
    return thunkAPI.rejectWithValue(error.message);
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
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
