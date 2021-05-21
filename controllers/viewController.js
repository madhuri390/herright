const Product = require('../model/productModel');
const Cart = require('../model/cartModel');
// const User = require('../model/userModel');
// const Booking = require('../model/bookingModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  //1)Get all products data
  const products = await Product.find();
  //2)Build the template

  //3)Render that template using data 1)
  res.status(200).render('overview', {
    title: 'All products',
    products,
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  //1)Get data from the requested data and also reviews and guides
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product)
    return next(new AppError('There is no product with this name', 404));
  //2)Build template

  //3)Render
  res.status(200).render('product', {
    title: `${product.name}`,
    product,
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  res.status(200).render('signup', {
    title: 'Signing you up!',
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

exports.getCartDetails = catchAsync(async (req, res) => {
  const userId = req.user.id;
  //console.log(userId);
  const cartItems = await Cart.find({ userId });
  console.log(cartItems);

  res.status(200).render('cart', {
    title: 'All cart items',
    cartItems,
  });
});
// exports.getAccount = (req, res) => {
//   res.status(200).render('account', {
//     title: 'Your account',
//     user: req.user,
//   });
// };
// exports.getMyTours = catchAsync(async (req, res, next) => {
//   //1)Find all bookings using user id
//   const bookings = await Booking.find({ user: req.user.id });
//   //2)Find tours with booked ids
//   const tourIds = bookings.map((el) => el.tour);
//   const tours = await Tour.find({ _id: { $in: tourIds } });
//   res.status(200).render('overview', {
//     title: 'My Bookings',
//     tours,
//   });
// });
// exports.updateUserData = catchAsync(async (req, res, next) => {
//   const updateUser = await User.findByIdAndUpdate(
//     req.user.id,
//     {
//       name: req.body.name,
//       email: req.body.email,
//     },
//     {
//       new: true,
//       runValidators: true,
//     }
//   );
//   console.log(updateUser);
//   res.status(200).render('account', {
//     title: 'Your account',
//     user: updateUser,
//   });
// });
