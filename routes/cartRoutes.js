const express = require('express');
const cartController = require('../controllers/cartController');
const authController = require('../controllers/authController');
const router = express.Router();

router.route('/').post(authController.protect, cartController.addToCart);
router
  .route('/decrement')
  .post(authController.protect, cartController.decrement);
router
  .route('/increment')
  .post(authController.protect, cartController.increment);
module.exports = router;
