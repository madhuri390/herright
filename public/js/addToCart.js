import axios from 'axios';
import { showAlert } from './alert';
export const addToCart = async (productId, size) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/cart',
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
