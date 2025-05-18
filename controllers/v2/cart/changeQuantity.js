const Cart = require('../../../models/Cart');
const changeQuantity = async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;
  if (action === 'INCREASE') {
    const userCart = await Cart.findOne({ createdBy: req.user.userId });
    const index = userCart.products.findIndex((product) => {
      return product.productId.toString() === id.toString();
    });
    if (index !== -1) {
      let item = userCart.products[index];
      item.quantity++;
      userCart.products[index] = item;
    }
    userCart.save();
    res.status(200).json({ cart: userCart });
  } else {
    const userCart = await Cart.findOne({ createdBy: req.user.userId });
    const index = userCart.products.findIndex((product) => {
      return product.productId.toString() === id.toString();
    });
    if (index !== -1) {
      if (userCart.products[index].quantity > 1) {
        let item = userCart.products[index];
        item.quantity--;
        userCart.products[index] = item;
      } else {
        userCart.products.splice(index, 1);
      }
    }
    userCart.save();
    res.status(200).json({ cart: userCart });
  }
};
module.exports = { changeQuantity };