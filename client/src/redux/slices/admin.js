import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: null,
  userList: null,
  userRemoval: false,
  orders: null,
  orderRemoval: false,
  deliveredFlag: false,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    getUsers: (state, { payload }) => {
      state.userList = payload;
      state.error = null;
      state.loading = false;
    },
    getOrders: (state, { payload }) => {
      state.orders = payload;
      state.error = null;
      state.loading = false;
    },
    userDelete: (state) => {
      state.userRemoval = true;
      state.error = null;
      state.loading = false;
    },
    orderDelete: (state) => {
      state.orderRemoval = true;
      state.error = null;
      state.loading = false;
    },
    resetError: (state) => {
      state.error = null;
      state.loading = false;
      state.userRemoval = false;
      state.deliveredFlag = false;
      state.orderRemoval = false;
    },
    setDeliveredFlag: (state) => {
      state.deliveredFlag = true;
      state.loading = false;
    },
  },
});

export const {
  setDeliveredFlag,
  setError,
  setLoading,
  resetError,
  getOrders,
  getUsers,
  userDelete,
  orderDelete,
} = adminSlice.actions;

export default adminSlice.reducer;

export const adminSelector = (state) => state.admin;
