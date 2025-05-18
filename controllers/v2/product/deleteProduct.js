const { StatusCodes } = require('http-status-codes');
const Product = require('../../../models/Product');
const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    throw new Error('Product not found');
  }
  res.status(StatusCodes.OK).send(product);
};
module.exports = { deleteProduct };