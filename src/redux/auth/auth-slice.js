import { createSlice } from '@reduxjs/toolkit';
import {
  handleRegistration,
  handleLogin,
  handleLogout,
  getCurrentUser,
  handleFacebookRegistration,
  getCalorieIntake,
  getCalorieIntakeForUser,
} from './auth-operations';

const initialState = {
  userDailyDiet: { calories: null, notRecomendedProducts: null },
  dailyDiet: { calories: null, notRecomendedProducts: null },
  user: {},
  accessToken: null,
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
      console.log('setAccessToken payload: ', payload);
      store.accessToken = payload;
    },
    setRefreshToken: (store, { payload }) => {
      console.log('setAccessToken payload: ', payload);
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
        store.userDailyDiet = payload.dailyDiet;
      })
      .addCase(handleLogin.rejected, (store, { payload }) => {
        store.isLoading = false;
        store.isError = payload;
      })
      .addCase(handleFacebookRegistration.pending, store => {
        store.isLoading = true;
        store.isError = null;
      })
      .addCase(handleFacebookRegistration.fulfilled, store => {
        store.isLoading = false;
      })
      .addCase(handleFacebookRegistration.rejected, (store, { payload }) => {
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
      .addCase(getCurrentUser.pending, store => {
        store.isLoading = true;
        store.isError = null;
      })
      .addCase(getCurrentUser.fulfilled, (store, { payload }) => {
        store.user = { ...payload.user };
        store.isLoading = false;
        store.isLogin = true;
        store.userDailyDiet = payload.dailyDiet;
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
          store.dailyDiet.notRecomendedProducts = notAllowedProduct;
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
          state.dailyDiet.notRecomendedProducts = notAllowedProduct;
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
