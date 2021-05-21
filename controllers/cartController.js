const Cart = require('./../model/cartModel');
const catchAsync = require('../utils/catchAsync');
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
});
