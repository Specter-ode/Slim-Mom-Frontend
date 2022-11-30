import { createSlice } from '@reduxjs/toolkit';
import {
  handleRegistration,
  handleLogin,
  handleLogout,
  getCurrentUser,
  getCalorieIntake,
  getCalorieIntakeForUser,
  refreshUserToken,
} from './auth-operations';

const initialState = {
  userDailyDiet: { calories: null, notRecommendedProducts: null },
  dailyDiet: { calories: null, notRecommendedProducts: null },
  user: {},
  accessToken: '',
  refreshToken: '',
  isLogin: false,
  isLoading: false,
  isError: null,
  showModal: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateModalStatus: (store, { payload }) => {
      store.showModal = payload;
    },
    setAccessToken: (store, { payload }) => {
      store.accessToken = payload;
    },
    setRefreshToken: (store, { payload }) => {
      store.refreshToken = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(handleRegistration.pending, store => {
        store.isLoading = true;
        store.isError = null;
      })
      .addCase(handleRegistration.fulfilled, (store, { payload }) => {
        store.user = { ...payload.user };
        store.accessToken = payload.accessToken;
        store.isLoading = false;
      })
      .addCase(handleRegistration.rejected, (store, { payload }) => {
        store.isLoading = false;
        store.isError = payload;
      })
      .addCase(handleLogin.pending, (store, _) => {
        store.isLoading = true;
        store.isError = null;
      })
      .addCase(handleLogin.fulfilled, (store, { payload }) => {
        store.user = { ...payload.user };
        store.accessToken = payload.accessToken;
        store.isLoading = false;
        store.isLogin = true;
        store.refreshToken = payload.refreshToken;
        store.userDailyDiet = {
          calories: payload.dailyDiet.calories,
          notRecommendedProducts: payload.dailyDiet.notAllowedProduct,
        };
      })
      .addCase(handleLogin.rejected, (store, { payload }) => {
        store.isLoading = false;
        store.isError = payload;
      })
      .addCase(handleLogout.pending, store => {
        store.isLoading = true;
        store.isError = null;
      })
      .addCase(handleLogout.fulfilled, () => ({ ...initialState }))
      .addCase(handleLogout.rejected, (store, { payload }) => {
        store.isLoading = false;
        store.isError = payload;
      })
      .addCase(refreshUserToken.fulfilled, (store, { payload }) => {
        store.accessToken = payload.accessToken;
        store.refreshToken = payload.refreshToken;
      })
      .addCase(getCurrentUser.pending, store => {
        store.isLoading = true;
        store.isError = null;
      })
      .addCase(getCurrentUser.fulfilled, (store, { payload }) => {
        store.user = { ...payload.user };
        store.isLoading = false;
        store.isLogin = true;
        store.userDailyDiet = {
          calories: payload.dailyDiet.calories,
          notRecommendedProducts: payload.dailyDiet.notAllowedProduct,
        };
      })
      .addCase(getCurrentUser.rejected, (store, { payload }) => {
        store.isLoading = false;
        store.isError = payload;
      })
      .addCase(getCalorieIntake.pending, store => {
        store.isLoading = true;
        store.isError = null;
      })
      .addCase(
        getCalorieIntake.fulfilled,
        (store, { payload: { notAllowedProduct, calories } }) => {
          store.dailyDiet.calories = calories;
          store.dailyDiet.notRecommendedProducts = [...notAllowedProduct];
          store.isLoading = false;
        }
      )
      .addCase(getCalorieIntake.rejected, (store, { payload }) => {
        store.isLoading = false;
        store.isError = payload;
      })
      .addCase(getCalorieIntakeForUser.pending, store => {
        store.isLoading = true;
        store.isError = null;
      })
      .addCase(
        getCalorieIntakeForUser.fulfilled,
        (state, { payload: { notAllowedProduct, calories } }) => {
          state.dailyDiet.calories = calories;
          state.dailyDiet.notRecommendedProducts = [...notAllowedProduct];
          state.isLoading = false;
        }
      )
      .addCase(getCalorieIntakeForUser.rejected, (store, { payload }) => {
        store.isLoading = false;
        store.isError = payload;
      });
  },
});

export const { updateModalStatus, setAccessToken, setRefreshToken } = authSlice.actions;
export default authSlice.reducer;
