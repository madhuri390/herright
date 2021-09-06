import axios from 'axios';
import { showAlert } from './alert';
export const addToCart = async (productId, size, price, colorId) => {
  console.log(price);
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/cart',
      data: {
        productId,
        size,
        price,
        colorId,
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
export const decrement = async (productId, size, price, colorId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/cart/decrement',
      data: {
        productId,
        size,
        price,
        colorId,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Decrement');
      console.log(res.data.Tprice);
      return res.data.Tprice;
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
export const increment = async (productId, size, price, colorId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/cart/increment',
      data: {
        productId,
        size,
        price,
        colorId,
      },
    });
    if (res.data.status === 'success') {
      console.log(res.data.data[0].totalAmount);

      showAlert('success', 'Increment');
      return res.data.data[0].totalAmount;
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
export const remove = async (productId, size, colorId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/cart/remove',
      data: {
        productId,
        size,
        colorId,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Remove');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
