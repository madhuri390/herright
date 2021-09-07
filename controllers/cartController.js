const Cart = require('./../model/cartModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
exports.addToCart = catchAsync(async (req, res, next) => {
  const productId = req.body.productId;
  const userId = req.user.id;
  const size = req.body.size;
  const price = req.body.price;
  const colorId = req.body.colorId;
  const results = await Cart.find({ userId, productId, colorId, size });

  if (results.length > 0) {
    //console.log('already existing');
    await Cart.updateMany(
      { userId, productId, size, colorId },
      { $inc: { quantity: 1 } }
    );
    // await Cart.aggregate([
    //   {
    //     $group: {
    //       _id: { userId },
    //       totalAmount: { $sum: { $multiply: ['$price', '$quantity'] } },
    //     },
    //   },
    // ]);
  } else {
    // console.log('new record');
    await Cart.create({ userId, productId, colorId, size, price });
  }
  res.status(200).json({
    status: 'success',
    // data: totalAmount,
  });
});
exports.decrement = catchAsync(async (req, res, next) => {
  const productId = req.body.productId;
  const userId = req.user.id;
  const size = req.body.size;
  const price = req.body.price;
  const colorId = req.body.colorId;
  const results = await Cart.find({ userId, productId, size, colorId });

  if (results.length > 0) {
    //console.log('already existing');
    if (results[0].quantity == 1) {
      await Cart.deleteOne({ userId, productId, size, colorId });
    } else {
      await Cart.updateMany(
        { userId, productId, size, colorId },
        { $inc: { quantity: -1, price: -price } }
      );
    }
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
  const productPrice = req.body.price;
  const colorId = req.body.colorId;
  const results = await Cart.find({ userId, productId, size, colorId });
  let Tprice = 0;
  if (results.length > 0) {
    //console.log('already existing');
    await Cart.updateMany(
      { userId, productId, size, colorId },
      { $inc: { quantity: 1, price: productPrice } }
    );
    // Tprice = await Cart.aggregate([
    //   {
    //     $group: {
    //       _id: { userId },
    //       totalAmount: { $sum: '$price' },
    //     },
    //   },
    // ]);
  }
  res.status(200).json({
    status: 'success',
    // data: Tprice,
  });
});

exports.remove = catchAsync(async (req, res, next) => {
  const productId = req.body.productId;
  const userId = req.user.id;
  const size = req.body.size;
  const price = req.body.price;
  const colorId = req.body.colorId;
  const results = await Cart.find({ userId, productId, size, colorId });

  if (results.length > 0) {
    //console.log('already existing');
    await Cart.deleteOne({ userId, productId, size, colorId });
  }
  res.status(200).json({
    status: 'success',
  });
});
