const Cart = require('./../model/cartModel');
const catchAsync = require('../utils/catchAsync');
exports.addToCart = catchAsync(async (req, res, next) => {
  const productId = req.body.productId;
  const userId = req.user.id;
  await Cart.create({ userId, productId });
});
