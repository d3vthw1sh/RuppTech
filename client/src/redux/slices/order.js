import { createSlice } from '@reduxjs/toolkit';

const storedAddress = JSON.parse(localStorage.getItem('shippingAddress')) || null;

export const initialState = {
  loading: false,
  error: null,
  orderInfo: null,
  orderId: null,
  shippingAddress: storedAddress,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    setShippingAddress: (state, { payload }) => {
      state.shippingAddress = payload;
      localStorage.setItem('shippingAddress', JSON.stringify(payload));
      state.loading = false;
    },
    clearOrder: (state) => {
      state.orderInfo = null;
      state.orderId = null;
      state.shippingAddress = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('shippingAddress');
    },
  },
});

export const { setLoading, setError, setShippingAddress, clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
export const orderSelector = (state) => state.order;
