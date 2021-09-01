const Cart = require('./../model/cartModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
exports.addToCart = catchAsync(async (req, res, next) => {
  const productId = req.body.productId;
  const userId = req.user.id;
  const size = req.body.size;
  const price = req.body.price;
  console.log(price);
  const results = await Cart.find({ userId, productId, size });

  if (results.length > 0) {
    //console.log('already existing');
    await Cart.updateMany(
      { userId, productId, size },
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
    await Cart.create({ userId, productId, size, price });
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
  const results = await Cart.find({ userId, productId, size });
  console.log(results[0].quantity);

  if (results.length > 0) {
    //console.log('already existing');
    if (results[0].quantity == 1) {
      console.log('should be deleted');
      await Cart.deleteOne({ userId, productId, size });
    } else {
      await Cart.updateMany(
        { userId, productId, size },
        { $inc: { quantity: -1, price: -price } }
      );
      // await Cart.aggregate([
      //   {
      //     $group: {
      //       _id: { userId },
      //       totalAmount: { $sum: { $multiply: ['$price', '$quantity'] } },
      //     },
      //   },
      // ]);
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
  const results = await Cart.find({ userId, productId, size });
  let Tprice = 0;
  console.log(results.length);
  if (results.length > 0) {
    //console.log('already existing');
    await Cart.updateMany(
      { userId, productId, size },
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
  console.log(Tprice);
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
  const results = await Cart.find({ userId, productId, size });

  if (results.length > 0) {
    //console.log('already existing');
    await Cart.deleteOne({ userId, productId, size });
  }
  res.status(200).json({
    status: 'success',
  });
});
