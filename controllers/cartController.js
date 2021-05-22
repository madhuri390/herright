const Cart = require('./../model/cartModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
exports.addToCart = catchAsync(async (req, res, next) => {
  const productId = req.body.productId;
  const userId = req.user.id;
  const size = req.body.size;
  const results = await Cart.find({ userId, productId, size });

  if (results.length > 0) {
    //console.log('already existing');
    await Cart.updateMany(
      { userId, productId, size },
      { $inc: { quantity: 1 } }
    );
  } else {
    // console.log('new record');
    await Cart.create({ userId, productId, size });
  }
  res.status(200).json({
    status: 'success',
  });
});
exports.decrement = catchAsync(async (req, res, next) => {
  const productId = req.body.productId;
  const userId = req.user.id;
  const size = req.body.size;
  const results = await Cart.find({ userId, productId, size });

  if (results.length > 0) {
    //console.log('already existing');
    await Cart.updateMany(
      { userId, productId, size },
      { $inc: { quantity: -1 } }
    );
  } else {
    return next(
      new AppError('Cannot decrement.Something went wrong!Please try again.')
    );
  }
  res.status(200).json({
    status: 'success',
  });
});
exports.increment = catchAsync(async (req, res, next) => {
  const productId = req.body.productId;
  const userId = req.user.id;
  const size = req.body.size;
  const results = await Cart.find({ userId, productId, size });

  if (results.length > 0) {
    //console.log('already existing');
    await Cart.updateMany(
      { userId, productId, size },
      { $inc: { quantity: 1 } }
    );
  }
  res.status(200).json({
    status: 'success',
  });
});
