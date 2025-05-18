const Cart = require('../../../models/Cart');
const addToCart = async (req, res) => {
  const userCart = await Cart.findOne({ createdBy: req.user.userId });

  if (!userCart) {
    const newCart = await Cart.create({ createdBy: req.user.userId });
    req.body.products.forEach((item) => {
      newCart.products.push(item);
    });
    newCart.save();
    res.status(200).json({ cart: newCart });
  } else {
    const { products } = req.body;
    products.forEach(async (item) => {
      const index = userCart.products.findIndex((product) => {
        return product.productId.toString() === item.productId.toString();
      });
      if (index !== -1) {
        let item = userCart.products[index];
        item.quantity++;
        userCart.products[index] = item;
      } else {
        await userCart.products.push(item);
      }
    });
    userCart.save();
    res.status(200).json({ cart: userCart });
  }
};
module.exports = { addToCart };