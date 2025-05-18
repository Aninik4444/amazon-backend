const { StatusCodes } = require('http-status-codes');
const Product = require('../../../models/Product');
const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product) {
    throw new Error('Product not found');
  }
  res.status(StatusCodes.OK).send(product);
};
module.exports = { updateProduct };