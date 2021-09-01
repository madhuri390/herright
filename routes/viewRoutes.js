const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
const bookingController = require('../controllers/bookingController');
const router = express.Router();

router.get(
  '/',
  bookingController.createBookingCheckout,
  viewController.getOverview
);
console.log('crossing');
router.use(authController.isLoggedIn);
router.get('/product/:slug', viewController.getProduct);
router.get('/signup', viewController.signup);
router.get('/login', viewController.getLoginForm);
router.get('/cart', authController.protect, viewController.getCartDetails);
router.get(
  '/checkout/:slug',
  authController.isLoggedIn,
  authController.protect,
  viewController.getCheckoutDetails
);

// router.get('/me', authController.protect, viewController.getAccount);
// router.get('/my-bookings', authController.protect, viewController.getMyTours);
// router.post(
//   '/submit-user-data',
//   authController.protect,
//   viewController.updateUserData
// );
module.exports = router;
