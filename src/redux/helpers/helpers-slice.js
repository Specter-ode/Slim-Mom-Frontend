import { createSlice } from '@reduxjs/toolkit';

const initialState = { showModal: false };

const helpersSlice = createSlice({
  name: 'helpers',
  initialState,
  reducers: {
    showModal: (store, action) => {
      store.modalVision = action.payload;
    },
  },
});

export const { modalVision } = helpersSlice.actions;
