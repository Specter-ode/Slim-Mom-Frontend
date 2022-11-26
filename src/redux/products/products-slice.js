import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productsOptions: [],
  dailyMeals: [],
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: {},
});

// export const {} = productsSlice.actions;
export default productsSlice.reducer;
