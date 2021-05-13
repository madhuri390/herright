const multer = require('multer');
const sharp = require('sharp');
const catchAsync = require('./../utils/catchAsync');
const appError = require('./../utils/appError');
const Product = require('../model/productModel');
const handleFactory = require('../controllers/handlerFactory');
const multiStorage = multer.memoryStorage();
const multiFilter = (req, file, cb) => {
  console.log(file);
  if (file.mimetype.split('/')[0] === 'image') {
    cb(null, true);
  } else {
    cb(new AppError('Not an image!!Please upload only images', 400), false);
  }
};
const upload = multer({
  storage: multiStorage,
  fileFilter: multiFilter,
});
exports.uploadProductimages = upload.fields([
  {
    name: 'imageCover',
    maxCount: 1,
  },
  {
    name: 'images',
    maxCount: 5,
  },
]);
exports.resizeProductimages = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover || !req.files.images) next();
  const name = req.body.name.replace(/\s/g, '');

  //Cover image
  req.body.imageCover = `product-${name}-${Date.now()}-cover.jpeg`;
  await sharp(req.files.imageCover[0].buffer)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/products/${req.body.imageCover}`);
  req.body.images = [];
  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `product-${name}-${Date.now()}-${i + 1}.jpeg`;
      await sharp(file.buffer)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/products/${filename}`);
      req.body.images.push(filename);
    })
  );
  next();
});
exports.getAllProducts = handleFactory.getAll(Product);
exports.getProduct = handleFactory.getOne(Product);
exports.createProduct = handleFactory.createOne(Product);
exports.updateProduct = handleFactory.updateOne(Product);
exports.deleteProduct = handleFactory.deleteOne(Product);
