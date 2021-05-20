exports.addToCart = (req, res, next) => {
  console.log(req.body.productId, req.cookies.jwt, req.user.id);
};
