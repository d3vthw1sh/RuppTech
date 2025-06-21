import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: null,
  products: [],
  product: null,
  pagination: {},
  favoritesToggled: false,
  reviewed: false,
  favorites: JSON.parse(localStorage.getItem('favorites')) ?? [],
  reviewRemoval: false,
  productUpdate: false,
};

export const productSlice = createSlice({
  name: 'product',  // singular to match store key
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setProducts: (state, { payload }) => {
      state.products = payload;
      state.loading = false;
      state.error = null;
      state.reviewRemoval = false;
    },
    setProduct: (state, { payload }) => {
      state.product = payload;
      state.loading = false;
      state.error = null;
      state.reviewed = false;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    setPagination: (state, { payload }) => {
      state.pagination = payload;
      state.loading = false;
      state.error = null;
    },
    setFavorites: (state, { payload }) => {
      state.favorites = payload;
    },
    setFavoritesToggle: (state, { payload }) => {
      state.favoritesToggled = payload;
    },
    productReviewed: (state, { payload }) => {
      state.reviewed = payload;
      state.loading = false;
      state.error = null;
    },
    resetError: (state) => {
      state.error = null;
      state.reviewed = false;
      state.productUpdate = false;
      state.reviewRemoval = false;
    },
    setProductUpdateFlag: (state) => {
      state.productUpdate = true;
      state.loading = false;
    },
    setReviewRemovalFlag: (state) => {
      state.reviewRemoval = true;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setProducts,
  setPagination,
  setFavoritesToggle,
  setFavorites,
  setProduct,
  productReviewed,
  setProductUpdateFlag,
  resetError,
  setReviewRemovalFlag,
} = productSlice.actions;

export default productSlice.reducer;

export const productSelector = (state) => state.product;  // singular here
