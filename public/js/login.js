/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    console.log(res.data);
    if (res.data.status == 'Admin login success') {
      showAlert('success', 'Admin Login Successfully.');
      window.setTimeout(() => {
        location.assign('/crud');
      }, 1500);
    }
    if (res.data.status === 'success') {
      showAlert('success', 'Login Successfully.');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('danger', 'Sorry!Please try again.');
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/users/logout',
    });
    if (res.data.status == 'success') {
      showAlert('success', 'Logged out Successfully.');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', 'Error Logging out!Try again');
  }
};
