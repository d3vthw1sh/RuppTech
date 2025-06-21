import { createSlice } from '@reduxjs/toolkit';

const calculateSubtotal = (cartItems) => {
  let result = 0;
  cartItems.forEach((item) => {
    result += item.qty * item.price;
  });
  return result;
};

const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
const storedShipping = parseFloat(localStorage.getItem('shipping')) || 4.99;

export const initialState = {
  loading: false,
  error: null,
  cartItems: storedCart,
  shipping: storedShipping,
  subtotal: calculateSubtotal(storedCart),
};

const updateLocalStorage = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  localStorage.setItem('subtotal', JSON.stringify(calculateSubtotal(cartItems)));
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    cartItemAdd: (state, { payload }) => {
      const existingItem = state.cartItems.find((item) => item.id === payload.id);
      if (existingItem) {
        state.cartItems = state.cartItems.map((item) =>
          item.id === existingItem.id ? payload : item
        );
      } else {
        state.cartItems.push(payload);
      }
      updateLocalStorage(state.cartItems);
      state.subtotal = calculateSubtotal(state.cartItems);
      state.loading = false;
      state.error = null;
    },
    cartItemRemoval: (state, { payload }) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== payload);
      updateLocalStorage(state.cartItems);
      state.subtotal = calculateSubtotal(state.cartItems);
      state.loading = false;
      state.error = null;
    },
    setShippingCosts: (state, { payload }) => {
      state.shipping = payload;
      localStorage.setItem('shipping', JSON.stringify(payload));
    },
    clearCart: (state) => {
      localStorage.removeItem('cartItems');
      localStorage.removeItem('shipping');
      localStorage.removeItem('subtotal');
      state.cartItems = [];
      state.shipping = 4.99;
      state.subtotal = 0;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setError,
  setLoading,
  cartItemAdd,
  cartItemRemoval,
  setShippingCosts,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const cartSelector = (state) => state.cart;
