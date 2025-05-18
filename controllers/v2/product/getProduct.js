const { StatusCodes } = require('http-status-codes');
const Product = require('../../../models/Product');
const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new Error('Product not found');
  }
  res.status(StatusCodes.OK).send(product);
};

module.exports = { getProduct };