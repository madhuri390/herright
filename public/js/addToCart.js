import axios from 'axios';
import { showAlert } from './alert';
export const addToCart = async (productId, size) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/cart',
      data: {
        productId,
        size,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Added to cart Successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
export const decrement = async (productId, size) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/cart/decrement',
      data: {
        productId,
        size,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Decrement');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
export const increment = async (productId, size) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/cart/increment',
      data: {
        productId,
        size,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Increment');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
