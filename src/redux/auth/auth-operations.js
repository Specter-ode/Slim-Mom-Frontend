import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api/auth';
import { toast } from 'react-toastify';

export const register = createAsyncThunk('auth/register', async (data, thunkAPI) => {
  try {
    const result = await api.register(data);
    return result;
  } catch (error) {
    toast.error(`Sorry, Register failed. Try again.`);
    return thunkAPI.rejectWithValue(error);
  }
});

// export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
//   try {
//     const result = await api.login(data);
//     return result;
//   } catch (error) {
//     toast.error(`Sorry, login failed. Check email and password. Try again.`);
//     return thunkAPI.rejectWithValue(error);
//   }
// });

// export const logout = createAsyncThunk(
//   'auth/logout',
//   async (data, thunkAPI) => {
//     try {
//       const result = await api.logout(data);
//       return result;
//     } catch (error) {
//       toast.error(`Sorry, register failed. Try again.`);
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// export const getCurrentUser = createAsyncThunk(
//   'auth/current-user',
//   async (_, thunkAPI) => {
//     try {
//       const { auth } = thunkAPI.getState();
//       const result = await api.getCurrentUser(auth.token);
//       return result;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error,
//         toast.error(
//           'Sorry, request failed. May be you have problems with network or token timed out '
//         )
//       );
//     }
//   },
//   {
//     condition: (_, thunkAPI) => {
//       const { auth } = thunkAPI.getState();
//       if (!auth.token) return false;
//     },
//   }
// );
