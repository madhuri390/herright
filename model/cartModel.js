const mongooose = require('mongoose');

const cartSchema = new mongooose.Schema({
  userId: {
    type: mongooose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A User must add a product'],
  },
  productId: {
    type: mongooose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'A product must be added by a user'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
bookingSchema.pre(/^find/, function (next) {
  this.populate('userId').populate('product');

  next();
});
const Cart = mongooose.model('Booking', cartSchema);

module.exports = Cart;
