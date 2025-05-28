const { StatusCodes } = require('http-status-codes');
const Product = require('../../../models/Product');

const getAllProducts = async (req, res) => {
  const { sort, name, category, numericFilters, select, inStock } = req.query;

  let queryObject = {};
  if (category) {
    queryObject.category = { $regex: category, $options: 'i' };
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }
  if (inStock) {
    queryObject.inStock = inStock == 'true';
  }
  if (numericFilters) {
    const operatorMap = {
      '<': '$lt',
      '<=': '$lte',
      '>': '$gt',
      '>=': '$gte',
      ':': '$eq',
    };
    const regex = /\b(<|>|>=|=|<|<=)\b/g;
    const filters = numericFilters.replace(
      regex,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ['price', 'rating'];
    filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObject);
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result.sort(sortList);
  }
  if (select) {
    const selectList = select.split(',').join(' ');
    result = result.select(selectList);
  }
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const products = await result.skip((page - 1) * limit).limit(limit);
  const count = await Product.countDocuments(queryObject);
  if (!products) {
    throw new Error('Products not found');
  }
  res.status(StatusCodes.OK).send({
    products,
    hits: products.length,
    count,
    totalPages: Math.ceil(count / limit),
    page,
    limit,
  });
};
module.exports = { getAllProducts };