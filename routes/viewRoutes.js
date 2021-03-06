const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
const bookingController = require('../controllers/bookingController');
const productController = require('../controllers/productController');
const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/edit/:id', viewController.editproduct);
router.get('/crud', viewController.crud);
router.get('/addVariation/:id', viewController.addColorVariation);
router.get('/product/:slug/:id', viewController.getProduct);
router.get('/signup', viewController.signup);
router.get('/login', viewController.getLoginForm);
router.get('/index', viewController.getIndex);
router.get('/blog', viewController.getBlog);
router.get('/contact', viewController.getContact);
router.get('/cart', authController.protect, viewController.getCartDetails);
router.get(
  '/',
  bookingController.createBookingCheckout,
  viewController.getOverview
);
router.get(
  '/checkout/:slug',
  authController.isLoggedIn,
  authController.protect,
  viewController.getCheckoutDetails
);
router.get('/:attribute/:value', viewController.getFilterProducts);

router.get('/update/:pid/:productColor', viewController.updateProduct);
router.get('/addProduct', viewController.getAddProduct);
router.get('/customerDetails', viewController.getCustomerDetails);
router.get('/customerOrders', viewController.getCustomerOrders);

// router.get('/me', authController.protect, viewController.getAccount);
// router.get('/my-bookings', authController.protect, viewController.getMyTours);
// router.post(
//   '/submit-user-data',
//   authController.protect,
//   viewController.updateUserData
// );
module.exports = router;
