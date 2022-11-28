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
      store.accessToken = payload.accessToken;
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

    // -----------------auth/facebook----------------------------
    [handleFacebookRegistration.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [handleFacebookRegistration.fulfilled]: (store, { payload }) => {
      store.loading = false;
    },
    [handleFacebookRegistration.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload.message;
    },

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
    // [handleLogin.rejected]: (store, { payload }) => {
    //   store.isLoading = false;
    //   store.isError = payload.response.data.message;
    // },

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
      console.log('payload: ', payload);
      store.user = { ...payload.user };
      store.isLoading = false;
      store.isLogin = true;
      store.userDailyDiet = payload.dailyDiet;
    },
    [getCurrentUser.rejected]: (store, { error }) => {
      store.loading = false;
      store.error = error.message;
    },
    //Daily Intake for NOT logged in user
    [getCalorieIntake.pending](state, _) {
      state.isLoading = true;
      state.isError = null;
    },

    [getCalorieIntake.fulfilled](state, { payload: { notAllowedProduct, calories } }) {
      state.dailyDiet.calories = calories;
      state.dailyDiet.notRecomendedProducts = notAllowedProduct;
      state.isLoading = false;
    },
    [getCalorieIntake.rejected](state, { payload }) {
      state.isLoading = false;
      state.isError = payload.message;
    },
    //Daily Intake for logged user
    [getCalorieIntakeForUser.pending](state, _) {
      state.isLoading = true;
      state.isError = null;
    },

    [getCalorieIntakeForUser.fulfilled](state, { payload: { notAllowedProduct, calories } }) {
      state.dailyDiet.calories = calories;
      state.dailyDiet.notRecomendedProducts = notAllowedProduct;
      state.isLoading = false;
    },
    [getCalorieIntakeForUser.rejected](state, { payload }) {
      state.isLoading = false;
      state.isError = payload.message;
    },
  },
});

export const { updateModalStatus } = authSlice.actions;
export default authSlice.reducer;
