import { createSlice } from '@reduxjs/toolkit';
import { getProductsByQuery, getDailyMeals, addMeal, deleteMeal } from './products-operations';

const initialState = {
  productsOptions: [],
  dailyMeals: [],
  date: '',
  isLoading: false,
  error: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
  extraReducers: {
    // ------------ getProductsByQuery ------------

    [getProductsByQuery.pending]: (state, _) => {
      state.isLoading = true;
      state.error = '';
    },
    [getProductsByQuery.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.productsOptions = action.payload;
    },
    [getProductsByQuery.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },

    // ------------ getDailyMeals ------------

    [getDailyMeals.pending]: (state, _) => {
      state.isLoading = true;
      state.error = '';
    },
    [getDailyMeals.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.dailyMeals = action.payload;
    },
    [getDailyMeals.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },

    // ------------ addMeal ------------

    [addMeal.pending]: (state, _) => {
      state.isLoading = true;
      state.error = '';
    },
    [addMeal.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.dailyMeals = [...state.dailyMeals, action.payload];
      state.products = [];
    },
    [addMeal.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },

    // ------------ deleteMeal ------------

    [deleteMeal.pending]: (state, _) => {
      state.isLoading = true;
      state.error = '';
    },
    [deleteMeal.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.dailyMeals = state.dailyMeals.filter(item => item._id !== action.payload);
    },
    [deleteMeal.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setDate } = productsSlice.actions;
export default productsSlice.reducer;
