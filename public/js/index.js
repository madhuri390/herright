import '@babel/polyfill';
import { signup } from './signup';
import { login, logout } from './login';
import { addToCart, decrement, increment, remove } from './addToCart';
import { bookTour } from './stripe';
//DOM Elements
const signupForm = document.querySelector('.form--signup');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const addtocartBtn = document.getElementById('add-to-cart');
const decrementBtn = document.querySelectorAll('.decrement');
const incrementBtn = document.querySelectorAll('.increment');
const card = document.querySelectorAll('.display-card');
const trashBtn = document.querySelectorAll('.trash');
const bookBtn = document.getElementById('place-order-btn');
//Values

//hiiiiiiii

//Delegation
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('confirmpass').value;
    const phoneNumber = document.getElementById('contact').value;
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
      flat,
      locality,
      landmark
    );
  });
}

//login
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);
  });
}
if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

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

if (addtocartBtn)
  addtocartBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { productId } = e.target.dataset;
    const { productPrice } = e.target.dataset;
    var size = document.getElementById('size').value;
    // console.log(productId, size);
    if (!size) {
      alert('Please select a size...');
    } else {
      addToCart(productId, size, productPrice);
      e.target.textContent = 'Added to the cart!';
    }
  });

for (let i = 0; i < decrementBtn.length; i++) {
  decrementBtn[i].addEventListener('click', (e) => {
    const { productId, productSize, productPrice } = e.target.dataset;
    const { result } = decrement(productId, productSize, productPrice);
    var input_quantity = document.getElementById(
      `${productId}-${productSize}`
    ).value;
    // var totalAmount = document.getElementById('totalAmount').value;
    console.log(totalAmount);
    if (document.getElementById(`${productId}-${productSize}`).value == 1) {
      card[i].innerHTML = '';
      //removeitem(cardno);
    }
    document.getElementById(`${productId}-${productSize}`).value =
      parseInt(input_quantity) - 1;
    document.getElementById(`${productId}-${productSize}-price`).innerHTML =
      (parseInt(input_quantity) - 1) * productPrice;

    // document.getElementById(`subtotal`).innerHTML = totalAmount;
  });
}
for (let i = 0; i < incrementBtn.length; i++) {
  incrementBtn[i].addEventListener('click', (e) => {
    const { productId, productSize, productPrice } = e.target.dataset;
    const result = increment(productId, productSize, productPrice);
    console.log('res', result.PromiseResult);
    var input_quantity = document.getElementById(
      `${productId}-${productSize}`
    ).value;
    document.getElementById(`${productId}-${productSize}`).value =
      parseInt(input_quantity) + 1;
    document.getElementById(`${productId}-${productSize}-price`).innerHTML =
      (parseInt(input_quantity) + 1) * productPrice;
    // document.getElementById('subtotal').innerHTML = result;
  });
}
for (let i = 0; i < trashBtn.length; i++) {
  trashBtn[i].addEventListener('click', (e) => {
    const { productId, productSize } = e.target.dataset;
    console.log(productId, productSize);
    remove(productId, productSize);
    card[i].innerHTML = '';
  });
}

if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { userId } = e.target.dataset;
    console.log('inside', userId);
    bookTour(userId);
  });
}
