const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');
const router = express.Router();
router.get(
  '/checkout-session/:userId/:addressId',
  bookingController.getCheckoutSession
);
// router.use(authController.restrictTo('admin', 'lead-guides'));

// router
//   .route('/')
//   .get(bookingController.getAllBookings)
//   .post(bookingController.createBooking);
// router
//   .route('/:id')
//   .get(bookingController.getBooking)
//   .patch(bookingController.updateBooking)
//   .delete(bookingController.deleteBooking);

module.exports = router;
