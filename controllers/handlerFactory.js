const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return next(new AppError('No document found by this Id', 404));
    res.status(204).json({
      status: 'Success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) return next(new AppError('No document find with that ID', 404));
    res.status(200).json({
      status: 'Success',
      data: {
        doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    if (req.body.images && req.body.imageCover) {
      const color = {
        name: req.body.name,
        images: req.body.images,
        imageCover: req.body.imageCover,
        productColor: req.body.productColor,
        slug: req.body.name.replace(/\s/g, '') + req.body.productColor,
      };
      req.body.color = color;
      console.log(req.body.color);
    }
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    if (!doc) return next(new AppError('No document find with that ID', 404));
    res.status(200).json({
      status: 'Success',
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res) => {
    //Allow nested
    let filter = {};
    // console.log(req.params);
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitingFields()
      .pagination();
    //const doc = await features.query.explain();
    const doc = await features.query;
    res.status(200).json({
      status: 'success',
      result: doc.length,
      data: {
        data: doc,
      },
    });
  });
