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
  .patch(
    productController.uploadProductimages,
    productController.resizeProductimages,
    productController.addVariation
  )
  .get(productController.getProduct)
  .delete(productController.deleteProduct);
router.use(
  productController.uploadProductimages,
  productController.resizeProductimages
);
router.route('/:pid/:productColor').patch(productController.updateProductColor);

module.exports = router;
