import axios from 'axios';
import {
  setError,
  setLoading,
  setShippingCosts,
  cartItemAdd,
  cartItemRemoval,
  clearCart,
} from '../slices/cart';

const BASE_URL = 'http://localhost:5001';

export const addCartItem = (id, qty) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);
    const itemToAdd = {
      id: data._id,
      name: data.name,
      subtitle: data.subtitle,
      image: data.images[0],
      price: data.price,
      stock: data.stock,
      brand: data.brand,
      qty,
      stripeId: data.stripeId,
    };

    dispatch(cartItemAdd(itemToAdd));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(
      setError(
        error.response?.data?.message ||
          error.message ||
          'An unexpected error has occurred. Please try again later.'
      )
    );
    dispatch(setLoading(false));
  }
};

export const removeCartItem = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(cartItemRemoval(id));
  dispatch(setLoading(false));
};

export const setShipping = (value) => async (dispatch) => {
  dispatch(setShippingCosts(value));
};

export const resetCart = () => (dispatch) => {
  dispatch(clearCart());
};
