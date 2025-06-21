import axios from 'axios';
import { setError, setShippingAddress, clearOrder } from '../slices/order';

const BASE_URL = 'http://localhost:5001';

export const setAddress = (data) => (dispatch) => {
  dispatch(setShippingAddress(data));
};

export const setPayment = () => async (dispatch, getState) => {
  const {
    cart: { cartItems, subtotal, shipping },
    order: { shippingAddress },
    user: { userInfo },
  } = getState();

  const newOrder = {
    subtotal,
    shipping,
    shippingAddress,
    cartItems,
    userInfo,
  };

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(`${BASE_URL}/api/checkout`, newOrder, config);
    window.location.assign(data.url);
  } catch (error) {
    dispatch(
      setError(
        error.response?.data?.message ||
          error.message ||
          'An unexpected error has occurred. Please try again later.'
      )
    );
  }
};

export const resetOrder = () => async (dispatch) => {
  dispatch(clearOrder());
};
