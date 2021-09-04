const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router
  .route('/')
  .get(productController.getAllProducts)
  .post(
    productController.uploadProductimages,
    productController.resizeProductimages,
    productController.createProduct
  );

router
  .route('/:id')
  .get(productController.getProduct)
  .delete(productController.deleteProduct);
router.use(
  productController.uploadProductimages,
  productController.resizeProductimages
);
router.route('/:id').patch(productController.updateProduct);
module.exports = router;
