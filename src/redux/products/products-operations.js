import * as api from '../../services/api/products';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const fetchProducts = createAsyncThunk('contacts/fetch', async (_, thunkAPI) => {
  try {
    const result = await api.getProducts();
    return result;
  } catch (error) {
    toast.error(`Sorry, request failed. We can't load your contacts.`);
    return thunkAPI.rejectWithValue(error);
  }
});
