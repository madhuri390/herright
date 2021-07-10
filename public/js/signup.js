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
      url: 'http://127.0.0.1:8000/api/v1/users/signup',
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
      showAlert('success', 'Login Successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
// import { showAlert } from './alert';
// export const signup = async (
//   name,
//   password,
//   passwordConfirm,
//   phoneNumber,
//   email,
//   pincode,
//   city,
//   state,
//   locality,
//   flat,
//   landmark
// ) => {
//   try {
//     console.log(name, password);
//     const res = await axios({
//       method: 'POST',
//       url: 'http://127.0.0.1:8000/api/v1/users/signup',
//       data: {
//         name,
//         password,
//         passwordConfirm,
//         phoneNumber,
//         email,
//         pincode,
//         city,
//         state,
//         locality,
//         flat,
//         landmark,
//       },
//     });
//     if (res.data.status === 'success') {
//       showAlert('success', 'Registered Successfully');
//       window.setTimeout(() => {
//         location.assign('/');
//       }, 1500);
//     }
//   } catch (err) {
//     showAlert('error', err.response.data.message);
//   }
// };

// export const logout = async () => {
//   try {
//     const res = await axios({
//       method: 'GET',
//       url: 'http://127.0.0.1:8000/api/v1/users/logout',
//     });
//     if (res.data.status == 'success') location.reload(true);
//   } catch (err) {
//     showAlert('error', 'Error Logging out!Try again');
//   }
// };
