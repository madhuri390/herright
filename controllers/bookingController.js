const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const handleFactory = require('./handlerFactory');
const Cart = require('../model/cartModel');
const User = require('../model/userModel');
const Booking = require('../model/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  //1)Get currently booked tour
  const userId = req.params.userId;
  const addressId = req.params.addressId;
  const cart = await Cart.find({ userId });
  //2)Create checkout session
  const user = await User.findById(req.params.userId);
  const lineItems = [];
  try {
    for (let item of cart) {
      lineItems.push({
        name: item.productId.name,
        amount: item.productId.price * 100,
        currency: 'INR',
        quantity: item.quantity,
      });
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${req.protocol}://${req.get(
        'host'
      )}/?user=${userId}&address=${addressId}`,
      cancel_url: `${req.protocol}://${req.get('host')}`,
      line_items: lineItems,
    });

    //3)Create checkout session as response
    res.status(200).json({
      status: 'success',
      session,
    });
  } catch (e) {
    console.log('error ', e);
  }
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  const { user, address } = req.query;
  if (!user) return next();
  const cartItems = await Cart.find({ userId: user });
  let totalPrice = 0;
  for (let item of cartItems) {
    totalPrice = totalPrice + item.price;
  }
  const productIds = await Cart.find({ userId: user })
    .select('productId')
    .select('colorId')
    .select('size')
    .select('quantity');
  await Booking.create({
    userId: user,
    addressId: address,
    product: productIds,
    price: totalPrice,
  });

  await Cart.deleteMany({
    userId: user,
  });
  res.redirect(req.originalUrl.split('?')[0]);
});

// exports.getAllBookings = handleFactory.getAll(Booking);
// exports.getBooking = handleFactory.getOne(Booking, { path: 'tours' });
// exports.createBooking = handleFactory.createOne(Booking);
// exports.updateBooking = handleFactory.updateOne(Booking);
// exports.deleteBooking = handleFactory.deleteOne(Booking);
