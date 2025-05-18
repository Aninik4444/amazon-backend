const Cart = require('../../../models/Cart');
const removeFromCart = async (req, res) => {
  const { id } = req.params;
  console.log({ id }, req.user.userId);
  const userCart = await Cart.findOne({ createdBy: req.user.userId });
  console.log(userCart);
  const index = userCart.products.findIndex((product) => {
    return product.productId.toString() === id.toString();
  });
  userCart.products.splice(index, 1);
  userCart.save();
  res.status(200).json({ cart: userCart });
};
module.exports = { removeFromCart };