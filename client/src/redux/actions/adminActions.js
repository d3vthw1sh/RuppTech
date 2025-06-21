import axios from 'axios';
import {
  setProducts,
  setProductUpdateFlag,
  setReviewRemovalFlag
} from '../slices/product';
import {
  setDeliveredFlag,
  setError,
  setLoading,
  resetError,
  getOrders,
  getUsers,
  userDelete,
  orderDelete,
} from '../slices/admin';

const BASE_URL = 'http://localhost:5001';

export const getAllUsers = () => async (dispatch, getState) => {
  dispatch(setLoading());
  const {
    user: { userInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.get(`${BASE_URL}/api/users`, config);
    dispatch(getUsers(data));
  } catch (error) {
    dispatch(
      setError(
        error.response?.data?.message ||
          error.message ||
          'An expected error has occurred. Please try again later.'
      )
    );
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  dispatch(setLoading());
  const {
    user: { userInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.delete(`${BASE_URL}/api/users/${id}`, config);
    dispatch(userDelete(data));
  } catch (error) {
    dispatch(
      setError(
        error.response?.data?.message ||
          error.message ||
          'An expected error has occurred. Please try again later.'
      )
    );
  }
};

export const getAllOrders = () => async (dispatch, getState) => {
  dispatch(setLoading());
  const {
    user: { userInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.get(`${BASE_URL}/api/orders`, config);
    dispatch(getOrders(data));
  } catch (error) {
    dispatch(
      setError(
        error.response?.data?.message ||
          error.message ||
          'An expected error has occurred. Please try again later.'
      )
    );
  }
};

export const deleteOrder = (id) => async (dispatch, getState) => {
  dispatch(setLoading());
  const {
    user: { userInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.delete(`${BASE_URL}/api/orders/${id}`, config);
    dispatch(orderDelete(data));
  } catch (error) {
    dispatch(
      setError(
        error.response?.data?.message ||
          error.message ||
          'An expected error has occurred. Please try again later.'
      )
    );
  }
};

export const setDelivered = (id) => async (dispatch, getState) => {
  dispatch(setLoading());
  const {
    user: { userInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.put(`${BASE_URL}/api/orders/${id}`, {}, config);
    dispatch(setDeliveredFlag());
  } catch (error) {
    dispatch(
      setError(
        error.response?.data?.message ||
          error.message ||
          'An expected error has occurred. Please try again later.'
      )
    );
  }
};

export const resetErrorAndRemoval = () => async (dispatch) => {
  dispatch(resetError());
};

export const updateProduct = (
  brand, name, category, stock, price, id,
  productIsNew, description, subtitle, stripeId,
  imageOne, imageTwo
) => async (dispatch, getState) => {
  dispatch(setLoading());
  const {
    user: { userInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.put(
      `${BASE_URL}/api/products`,
      { brand, name, category, stock, price, id, productIsNew, description, subtitle, stripeId, imageOne, imageTwo },
      config
    );
    dispatch(setProducts(data));
    dispatch(setProductUpdateFlag());
  } catch (error) {
    dispatch(
      setError(
        error.response?.data?.message ||
          error.message ||
          'An expected error has occurred. Please try again later.'
      )
    );
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  dispatch(setLoading());
  const {
    user: { userInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.delete(`${BASE_URL}/api/products/${id}`, config);
    dispatch(setProducts(data));
    dispatch(setProductUpdateFlag());
    dispatch(resetError());
  } catch (error) {
    dispatch(
      setError(
        error.response?.data?.message ||
          error.message ||
          'An expected error has occurred. Please try again later.'
      )
    );
  }
};

export const uploadProduct = (newProduct) => async (dispatch, getState) => {
  dispatch(setLoading());
  const {
    user: { userInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.post(`${BASE_URL}/api/products`, newProduct, config);
    dispatch(setProducts(data));
    dispatch(setProductUpdateFlag());
  } catch (error) {
    dispatch(
      setError(
        error.response?.data?.message ||
          error.message ||
          'An expected error has occurred. Please try again later.'
      )
    );
  }
};

export const removeReview = (productId, reviewId) => async (dispatch, getState) => {
  dispatch(setLoading());
  const {
    user: { userInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.put(`${BASE_URL}/api/products/${productId}/${reviewId}`, {}, config);
    dispatch(setProducts(data));
    dispatch(setReviewRemovalFlag());
  } catch (error) {
    dispatch(
      setError(
        error.response?.data?.message ||
          error.message ||
          'An expected error has occurred. Please try again later.'
      )
    );
  }
};
