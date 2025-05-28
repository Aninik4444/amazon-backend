const { StatusCodes } = require('http-status-codes');
const Product = require('../../../models/Product');

const addProducts = async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('Please provide an image');
    }
    req.body.imageURL = req.file.location;
    const products = await Product.insertMany(req.body);
    if (!products) {
      throw new Error('Something went wrong');
    }
    return res.status(StatusCodes.CREATED).send(products);
  } catch (error) {
    console.error('Error in addProducts controller:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

module.exports = { addProducts };