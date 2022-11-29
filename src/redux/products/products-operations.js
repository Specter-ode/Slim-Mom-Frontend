import * as api from 'services/api/products';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const getProductsByQuery = createAsyncThunk(
  'products/getProductsByQuery',
  async (query, { rejectWithValue }) => {
    try {
      const products = await api.getProductsByQuery(query);
      return products;
    } catch (error) {
      toast.error(`Sorry, request failed. We can't load products options for your diary.`);
      return rejectWithValue(error.message);
    }
  }
);

export const getDailyMeals = createAsyncThunk(
  'meals/getDailyMeals',
  async (newData, { rejectWithValue }) => {
    try {
      const meals = await api.getDailyMeals(newData);
      return meals;
    } catch (error) {
      toast.error(`Sorry, request failed. We can't load your meals.`);
      return rejectWithValue(error.message);
    }
  }
);

export const addMeal = createAsyncThunk('meals/addMeal', async (newMeal, { rejectWithValue }) => {
  try {
    const meal = await api.addMeal(newMeal);
    return meal;
  } catch (error) {
    toast.error(`Sorry, request failed. We can't add your meal.`);
    return rejectWithValue(error.message);
  }
});

export const deleteMeal = createAsyncThunk(
  'meals/deleteMeal',
  async (mealId, { rejectWithValue }) => {
    try {
      await api.deleteMeal(mealId);
      return mealId;
    } catch (error) {
      toast.error(`Sorry, request failed. We can't delete your meal.`);
      return rejectWithValue(error.message);
    }
  }
);
