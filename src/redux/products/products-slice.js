import { createSlice } from '@reduxjs/toolkit';
// import {} from './products-operations';

const initialState = {
  productsOptions: [],
  dailyMeals: [],
  date: null,
  isLoading: false,
  error: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: {},
});

// export const {} = productsSlice.actions;
export default productsSlice.reducer;
