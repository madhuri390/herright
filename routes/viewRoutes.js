const express = require('express');
const viewController = require('./../controllers/viewController');
// const authController = require('../controller/authController');
// const bookigController = require('../controller/bookingController');
const router = express.Router();
router.get('/', viewController.getOverview);
router.get('/product/:slug', viewController.getProduct);
router.get('/signup', viewController.signup);
// router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
// router.get('/me', authController.protect, viewController.getAccount);
// router.get('/my-bookings', authController.protect, viewController.getMyTours);
// router.post(
//   '/submit-user-data',
//   authController.protect,
//   viewController.updateUserData
// );
module.exports = router;
