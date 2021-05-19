const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
// const bookigController = require('../controller/bookingController');
const router = express.Router();
router.use(authController.isLoggedIn);
router.get('/', viewController.getOverview);
router.get('/product/:slug', viewController.getProduct);
router.get('/signup', viewController.signup);
router.get('/login', viewController.getLoginForm);
// router.get('/me', authController.protect, viewController.getAccount);
// router.get('/my-bookings', authController.protect, viewController.getMyTours);
// router.post(
//   '/submit-user-data',
//   authController.protect,
//   viewController.updateUserData
// );
module.exports = router;
