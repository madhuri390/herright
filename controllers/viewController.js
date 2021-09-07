const Product = require('../model/productModel');
const Cart = require('../model/cartModel');
const Users = require('../model/userModel');
// const User = require('../model/userModel');
// const Booking = require('../model/bookingModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const authController = require('../controllers/authController');
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
  const similarProduct = await Product.find({
    $or: [{ color: product.color }, { category: /.*`${product.category}`.*/ }],
  });
  // db.inventory.find({ $or: [{ quantity: { $lt: 20 } }, { price: 10 }] });
  console.log('similar ', similarProduct);
  if (!product)
    return next(new AppError('There is no product with this name', 404));
  //2)Build template

  //3)Render
  res.status(200).render('product', {
    title: `${product.name}`,
    product,
    similarProduct,
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  res.status(200).render('signup', {
    title: 'Signing you up!',
  });
});



exports.getLoginForm = async (req, res) => {
  if (req.cookies.jwt) {
    const products = await Product.find();
    res.status(200).render('overview', {
      title: 'All products',
      products,
    });
  } else {
    res.status(200).render('login', {
      title: 'Log into your account',
    });
  }
};

exports.getIndex = (req, res) => {
  res.status(200).render('index', {
    title: 'Log into your account',
  });
};

exports.getBlog = (req, res) => {
  res.status(200).render('blog', {
    title: 'Get to know more about us',
  });
};

exports.getContact = (req, res) => {
  res.status(200).render('contact', {
    title: 'Contact us now',
  });
};

exports.getCartDetails = catchAsync(async (req, res) => {
  const userId = req.user.id;
  //console.log(userId);
  const cartItems = await Cart.find({ userId });

  res.status(200).render('cart', {
    title: 'All cart items',
    cartItems,
  });
});
exports.getCheckoutDetails = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const userDetails = await Users.find({ userId });
  const cartItems = await Cart.find({ userId });
  res.status(200).render('checkout', {
    title: 'All cart items',
    userDetails,
    cartItems,
  });
});
exports.getAddProduct = (req, res) => {
  res.status(200).render('addProduct', {
    title: 'Adding product',
  });
};
exports.crud = catchAsync(async (req, res) => {
  const products = await Product.find();
  res.status(200).render('crud', {
    title: 'Crud operation',
    products,
  });
});
exports.updateProduct = catchAsync(async (req, res, next) => {
  //1)Get data from the requested data and also reviews and guides
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product)
    return next(new AppError('There is no product with this name', 404));
  //2)Build template

  //3)Render
  res.status(200).render('update', {
    title: `${product.name}`,
    product,
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
