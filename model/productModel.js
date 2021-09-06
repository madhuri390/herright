const mongoose = require('mongoose');

const slugify = require('slugify');
//const User = require('./userModel');
//const validator = require('validator');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A product name must have les or equal to 40 characters'],
      minlength: [
        10,
        'A product name must have more or equal to 10 characters',
      ],
      //validate: [validator.isAlpha, 'Tour name must only contain characters'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be less than 5'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          //this only points to current document not on update
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be less than regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A product must have a summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    color: [
      {
        slug: String,
        name: {
          type: String,
          required: [true, 'A product must have a name'],
          unique: true,
          trim: true,
          maxlength: [
            40,
            'A product name must have les or equal to 40 characters',
          ],
          minlength: [
            10,
            'A product name must have more or equal to 10 characters',
          ],
          //validate: [validator.isAlpha, 'Tour name must only contain characters'],
        },
        productColor: {
          type: String,
          required: [true, 'A product must have a color'],
        },
        imageCover: {
          type: String,
          required: [true, 'A product must have a cover image'],
        },
        images: [
          {
            type: String,
            required: [true, 'A product must have a images'],
          },
        ],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    category: {
      type: String,
      required: [true, 'A product must have a category'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
productSchema.index({ slug: 1 });
productSchema.pre('save', function (next) {
  console.log(this.color[0].name);
  this.slug = slugify(this.color[0].name + this.color[0].productColor, {
    lower: true,
  });
  next();
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
