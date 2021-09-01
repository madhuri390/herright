const path = require('path');
const express = require('express');
const morgan = require('morgan');
const productRouter = require('./routes/productRoutes');
const viewRouter = require('./routes/viewRoutes');
const userRouter = require('./routes/userRoutes');
const cartRouter = require('./routes/cartRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const app = express();
const cookieParser = require('cookie-parser');

//Global Middle wares
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
//Global Middle wares
app.use(express.static(path.join(__dirname, 'public')));
//1)Set security HTTP headers

//2)Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//3)Limit request from same API

//4)Body parser,reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

//Data Sanitization against NoSQL query injection

//Data sanitization against xss

//Prevent parameter pollution

//5)Serving static files
//app.use(express.static(`${__dirname}/public`));

//6)Test middlewares
app.use((req, res, next) => {
  console.log('Hello from Middleware 👋');
  next();
});
app.use('/', viewRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/bookings', bookingRouter);
module.exports = app;
