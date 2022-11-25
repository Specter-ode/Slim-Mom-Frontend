import { createSlice } from '@reduxjs/toolkit';
import { handleRegistration, handleLogin, handleLogout, getCurrentUser } from './auth-operations';

const initialState = {
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
      store.loading = true;
      store.error = null;
    },
    [handleRegistration.fulfilled]: (store, { payload }) => {
      store.userData = { ...payload.userData };
      store.token = payload.token;
      store.loading = false;
    },
    [handleRegistration.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload.message;
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
      store.loading = true;
      store.error = null;
    },
    [handleLogin.fulfilled]: (store, { payload }) => {
      store.userData = { ...payload.userData };
      store.accessToken = payload.accessToken;
      store.loading = false;
      store.sid = payload.sid;
      store.refreshToken = payload.refreshToken;
      store.currentUser = true;
    },
    [handleLogin.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload.message;
    },

    // -------------------logout------------------------------
    [handleLogout.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [handleLogout.fulfilled]: () => ({ ...initialState }),
    [handleLogout.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload.message;
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
  },
});

export const { updateModalStatus } = authSlice.actions;
export default authSlice.reducer;
