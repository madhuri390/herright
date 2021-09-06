import '@babel/polyfill';
import { signup, addAddress } from './signup';
import { login, logout } from './login';
import { addToCart, decrement, increment, remove } from './addToCart';
import { bookTour } from './stripe';
import {
  insertProduct,
  updateProduct,
  deleteProduct,
  addColor,
} from './productcrud';
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
const productDataForm = document.querySelector('.form-product-data');
const updateDataForm = document.querySelector('.form-update-data');
const addColorDataForm = document.querySelector('.form-addColor-data');
const deleteProductForm = document.querySelectorAll('.delete');
const addPreference = document.getElementById('addPreference');
const addAddressBtn = document.querySelector('.form--addAddress');
const addressRadioBtn = document.getElementsByName('addressRadio');
//Values

var addressId;

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

if (productDataForm) {
  productDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    const addPreferencees = document.getElementsByName('categories[]');
    var vals = '';
    for (var i = 0, n = checkboxes.length; i < n; i++) {
      if (checkboxes[i].checked) {
        vals += ',' + checkboxes[i].value;
      }
    }
    console.log('Values', vals);
    console.log(document.getElementById('photo').files);
    form.append('name', document.getElementById('name').value);
    form.append('price', document.getElementById('price').value);
    form.append('imageCover', document.getElementById('photo').files[0]);
    form.append('images', document.getElementById('photo').files[0]);
    form.append('color', document.getElementById('color').value);
    form.append('description', document.getElementById('description').value);
    form.append('summary', document.getElementById('summary').value);
    form.append('category', vals);
    insertProduct(form, 'data');
  });
}
if (updateDataForm) {
  updateDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    const pid = document.getElementById('pid').value;
    const productColor = document.getElementById('productColor').value;
    form.append('name', document.getElementById('name').value);
    form.append('price', document.getElementById('price').value);
    form.append('imageCover', document.getElementById('photo').files[0]);
    form.append('images', document.getElementById('photo').files[0]);
    form.append('productColor', document.getElementById('color').value);
    form.append('description', document.getElementById('description').value);
    form.append('summary', document.getElementById('summary').value);
    form.append('category', 'tops');
    console.log(pid, productColor);
    updateProduct(form, pid, productColor);
  });
}
if (addColorDataForm) {
  addColorDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    const id = document.getElementById('id').value;
    form.append('name', document.getElementById('name').value);
    form.append('imageCover', document.getElementById('photo').files[0]);
    form.append('images', document.getElementById('photo').files[0]);
    form.append('productColor', document.getElementById('color').value);
    console.log(id);
    addColor(form, id);
  });
}
for (let i = 0; i < deleteProductForm.length; i++) {
  deleteProductForm[i].addEventListener('click', (e) => {
    const { productId } = e.target.dataset;
    deleteProduct(productId);
  });
}
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
    const { colorId } = e.target.dataset;
    var size = document.getElementById('size').value;
    console.log(colorId);
    // console.log(productId, size);
    if (!size) {
      alert('Please select a size...');
    } else {
      addToCart(productId, size, productPrice, colorId);
      e.target.textContent = 'Added to the cart!';
    }
  });

for (let i = 0; i < decrementBtn.length; i++) {
  decrementBtn[i].addEventListener('click', (e) => {
    const { productId, productSize, productPrice, colorId } = e.target.dataset;
    decrement(productId, productSize, productPrice, colorId);
    var input_quantity = document.getElementById(
      `${productId}-${productSize}-${colorId}`
    ).value;
    // var totalAmount = document.getElementById('totalAmount').value;
    if (
      document.getElementById(`${productId}-${productSize}-${colorId}`).value ==
      1
    ) {
      card[i].innerHTML = '';
      //removeitem(cardno);
    }
    document.getElementById(`${productId}-${productSize}-${colorId}`).value =
      parseInt(input_quantity) - 1;
    document.getElementById(
      `${productId}-${productSize}-${colorId}-price`
    ).innerHTML = (parseInt(input_quantity) - 1) * productPrice;

    // document.getElementById(`subtotal`).innerHTML = totalAmount;
  });
}
for (let i = 0; i < incrementBtn.length; i++) {
  incrementBtn[i].addEventListener('click', (e) => {
    const { productId, productSize, productPrice, colorId } = e.target.dataset;
    const result = increment(productId, productSize, productPrice, colorId);
    var input_quantity = document.getElementById(
      `${productId}-${productSize}-${colorId}`
    ).value;
    document.getElementById(`${productId}-${productSize}-${colorId}`).value =
      parseInt(input_quantity) + 1;
    document.getElementById(
      `${productId}-${productSize}-${colorId}-price`
    ).innerHTML = (parseInt(input_quantity) + 1) * productPrice;
    // document.getElementById('subtotal').innerHTML = result;
  });
}
for (let i = 0; i < trashBtn.length; i++) {
  trashBtn[i].addEventListener('click', (e) => {
    const { productId, productSize, colorId } = e.target.dataset;
    remove(productId, productSize, colorId);
    card[i].innerHTML = '';
  });
}

if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    for (var i = 0; i < addressRadioBtn.length; i++) {
      if (addressRadioBtn[i].checked) {
        addressId = addressRadioBtn[i].value;
        break;
      }
    }
    const { userId } = e.target.dataset;
    bookTour(userId, addressId);
  });
}

if (addPreference)
  addPreference.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const result = document.getElementById('result');
    result.style.display = 'block';
  });

if (addAddressBtn) {
  addAddressBtn.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Yes');
    const userId = document.getElementById('userId').value;
    const pincode = document.getElementById('pincode').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const flat = document.getElementById('flat').value;
    const locality = document.getElementById('locality').value;
    const landmark = document.getElementById('landmark').value;
    console.log(userId, pincode, city, state, flat);
    addAddress(userId, pincode, city, state, flat, locality, landmark);
  });
}

if (addressRadioBtn) {
  for (i = 0; i < addressRadioBtn.length; i++) {
    if (addressRadioBtn[i].checked) {
    }
  }
}
