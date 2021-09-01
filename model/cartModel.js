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
  size: {
    type: String,
    required: [true, 'A Product must require a size'],
  },
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required: [true, 'A Product must require a price'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
cartSchema.pre(/^find/, function (next) {
  this.populate('userId').populate('productId');
  next();
});
const Cart = mongooose.model('Cart', cartSchema);

module.exports = Cart;
