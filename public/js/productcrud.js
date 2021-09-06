import axios from 'axios';
import { showAlert } from './alert';
export const insertProduct = async (data, type) => {
  for (var pair of data.entries()) {
    console.log(pair[0] + ', ' + pair[1]);
  }
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/products',
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Inserted Successfully.');
      window.setTimeout(() => {
        location.assign('/crud');
      }, 1500);
    }
  } catch (err) {
    showAlert('danger', 'Sorry!Please try again.');
  }
};
export const updateProduct = async (data, pid, productColor) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:3000/api/v1/products/${pid}/${productColor}`,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Updated Successfully.');
      window.setTimeout(() => {
        location.assign('/crud');
      }, 1500);
    }
  } catch (err) {
    showAlert('danger', 'Sorry!Please try again.');
  }
};
export const addColor = async (data, id) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:3000/api/v1/products/${id}`,
      data,
    });
    if (res.data.status === 'success') {
      console.log('in Success');
      showAlert('success', 'Updated Successfully.');
      window.setTimeout(() => {
        location.assign('/crud');
      }, 1500);
    }
  } catch (err) {
    showAlert('danger', 'Sorry!Please try again.');
  }
};
export const deleteProduct = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:3000/api/v1/products/${id}`,
      id,
    });
    if (res.data === '') {
      showAlert('success', 'Deleted Successfully.');
      window.setTimeout(() => {
        location.assign('/crud');
      }, 1500);
    }
  } catch (err) {
    showAlert('danger', 'Sorry!Please try again.');
  }
};
