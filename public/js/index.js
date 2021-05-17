import { signup } from './signup';

//DOM Elements
const signupForm = document.querySelector('.form--signup');
console.log(signupForm);
//Values

//Delegation
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('confirmpass').value;
    const phoneNumber = document.getElementByID('contact').value;
    const email = document.getElementById('email').value;
    const pincode = document.getElementById('pincode').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const flat = document.getElementById('flat').value;
    const locality = document.getElementById('locality').value;
    const landmark = document.getElementById('landmark').value;
    signup(
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
      landmark
    );
    console.log(name, email, password);
  });
}
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
// if (logoutBtn) {
//   logoutBtn.addEventListener('click', logout);
// }
// if (userDataForm) {
//   userDataForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     form.append('name', document.getElementById('name').value);
//     form.append('email', document.getElementById('email').value);
//     form.append('photo', document.getElementById('photo').files[0]);
//     updateSettings(form, 'data');
//   });
// }
// if (userPasswordForm) {
//   userPasswordForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     document.querySelector('.btn--save-password').textContent = 'Updating...';
//     const passwordCurrent = document.getElementById('password-current').value;
//     const password = document.getElementById('password').value;
//     const passwordConfirm = document.getElementById('password-confirm').value;
//     console.log(passwordCurrent, password, passwordConfirm);
//     await updateSettings(
//       { passwordCurrent, password, passwordConfirm },
//       'password'
//     );
//     document.querySelector('.btn--save-password').textContent = 'Save Password';
//     document.getElementById('password-current').value = '';
//     document.getElementById('password').value = '';
//     document.getElementById('password-confirm').value = '';
//   });
// }
