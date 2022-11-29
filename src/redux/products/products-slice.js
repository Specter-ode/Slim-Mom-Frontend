import { createSlice } from '@reduxjs/toolkit';

import { getProductsByQuery, getDailyMeals, addMeal, deleteMeal } from './products-operations';

const initialState = {
  productsOptions: [],
  dailyMeals: null,
  date: '',
  isLoading: false,
  error: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setDate: (state, { payload }) => {
      state.date = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProductsByQuery.pending, (state, _) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(getProductsByQuery.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.productsOptions = payload;
      })
      .addCase(getProductsByQuery.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(getDailyMeals.pending, (state, _) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(getDailyMeals.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.dailyMeals = payload;
      })
      .addCase(getDailyMeals.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(addMeal.pending, (state, _) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(addMeal.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.dailyMeals = [...state.dailyMeals, payload];
        state.productsOptions = [];
      })
      .addCase(addMeal.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(deleteMeal.pending, (state, _) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(deleteMeal.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.dailyMeals = state.dailyMeals.filter(item => item._id !== payload);
      })
      .addCase(deleteMeal.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const { setDate } = productsSlice.actions;
export default productsSlice.reducer;
