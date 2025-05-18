const Cart = require('../../../models/Cart');
const clearCart = async (req, res) => {
  const userCart = await Cart.findOneAndDelete({ createdBy: req.user.userId });

  res.status(200).json({ cart: userCart });
};
module.exports = { clearCart };