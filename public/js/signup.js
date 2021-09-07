import axios from 'axios';
import { showAlert } from './alert';
export const signup = async (
  name,
  password,
  passwordConfirm,
  phoneNumber,
  email,
  pincode,
  city,
  state,
  flat,
  locality,
  landmark
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/signup',
      data: {
        name,
        password,
        passwordConfirm,
        phoneNumber,
        email,
        pincode,
        city,
        state,
        locality,
        flat,
        landmark,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Registered  Successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
export const addAddress = async (
  userId,
  pincode,
  city,
  state,
  flat,
  locality,
  landmark
) => {
  try {
    console.log('in singup', pincode, state);
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/addAddress',
      data: {
        userId,
        pincode,
        city,
        state,
        locality,
        flat,
        landmark,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Added address Successfully');
      console.log(res.data);
      window.setTimeout(() => {
        location.assign(`/checkout/${userId}`);
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
