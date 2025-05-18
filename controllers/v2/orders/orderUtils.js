const  Product  = require('../../../models/Product');
const addOrderDetails = async (order) => {
    console.log({order});
  const { products } = order;
  const temp = await Promise.all(
    products.map(async (product) => {
      const productDetails = await Product.findOne({
        _id: product.productId,
      });
      const productName = productDetails.name;
      const productPrice = productDetails.price;
      const productImage = productDetails.imageURL; 
      const tempObj = { ...product, productName, productPrice, productImage };
      return tempObj;
    })
  );
  return { ...order, products: temp };
};
module.exports = { addOrderDetails };