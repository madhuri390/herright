const mongooose = require('mongoose');

const bookingSchema = new mongooose.Schema({
  userId: {
    type: mongooose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A user id is mandatory'],
  },
  product: [
    {
      productId: {
        type: mongooose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'A product must have an id'],
      },
    },
  ],
  price: {
    type: Number,
    required: [true, 'A booking must include a price'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
// bookingSchema.pre(/^find/, function (next) {
//   this.populate('userId').populate({
//     path: 'product',
//     select: 'productId',
//   });
//   next();
// });
const Booking = mongooose.model('Booking', bookingSchema);

module.exports = Booking;
