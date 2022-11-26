import { createSlice } from '@reduxjs/toolkit';
import {
  handleRegistration,
  handleLogin,
  handleLogout,
  getCurrentUser,
  getCalorieIntake,
} from './auth-operations';

const initialState = {
  userDailyDiet: { calories: null, notRecomendedProducts: null },
  dailyDiet: { calories: null, notRecomendedProducts: null },
  user: {},
  accessToken: '',
  refreshToken: '',
  isLogin: false,
  isLoading: false,
  isError: null,
  showModal: false,
  userDailyDiet: { calories: null, notRecomendedProducts: null },
  dailyDiet: { calories: null, notRecomendedProducts: null },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateModalStatus: (state, { payload }) => {
      console.log('changeModalVision payload: ', payload);
      state.showModal = payload;
    },
  },
  extraReducers: {
    // -------------------registration------------------------------
    [handleRegistration.pending]: store => {
      store.isLoading = true;
      store.isError = null;
    },
    [handleRegistration.fulfilled]: (store, { payload }) => {
      store.user = { ...payload.user };
      store.token = payload.token;
      store.isLoading = false;
    },
    [handleRegistration.rejected]: (store, { payload }) => {
      store.isLoading = false;
      store.isError = payload.message;
    },
    // -----------------auth/google----------------------------
    // [handleAuthGoogle.pending]: store => {
    //   store.loading = true;
    //   store.error = null;
    // },
    // [handleAuthGoogle.fulfilled]: (store, { payload }) => {
    //   store.loading = false;
    // },
    // [handleAuthGoogle.rejected]: (store, { payload }) => {
    //   store.loading = false;
    //   store.error = payload.message;
    // },

    // -------------------login------------------------------

    [handleLogin.pending]: store => {
      store.isLoading = true;
      store.isError = null;
    },
    [handleLogin.fulfilled]: (store, { payload }) => {
      store.user = { ...payload.user };
      store.accessToken = payload.accessToken;
      store.isLoading = false;
      store.isLogin = true;
      store.refreshToken = payload.refreshToken;
      store.userDailyDiet = payload.dailyDiet;
    },
    [handleLogin.rejected]: (store, { payload }) => {
      store.isLoading = false;
      store.isError = payload.message;
    },

    // -------------------logout------------------------------
    [handleLogout.pending]: store => {
      store.isLoading = true;
      store.isError = null;
    },
    [handleLogout.fulfilled]: () => ({ ...initialState }),
    [handleLogout.rejected]: (store, { payload }) => {
      store.isLoading = false;
      store.isError = payload.message;
    },

    // -------------------currentUser----------------------------------
    [getCurrentUser.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [getCurrentUser.fulfilled]: (store, { payload }) => {
      store.userData = { ...payload };
      store.currentUser = true;
    },
    [getCurrentUser.rejected]: (store, { error }) => {
      store.loading = false;
      store.error = error.message;
    },
    // Daily Intake
    [getCalorieIntake.fulfilled](state, { payload: { notAllowedProduct, calories } }) {
      state.dailyDiet.calories = calories;
      state.dailyDiet.notRecomendedProducts = notAllowedProduct;
    },
  },
});

export const { updateModalStatus } = authSlice.actions;
export default authSlice.reducer;
