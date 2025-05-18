const Cart = require('../../../models/Cart');
const getCart = async (req, res) => {
  const userCart = await Cart.findOne({ createdBy: req.user.userId });

  res.status(200).json({ cart: userCart });
};
module.exports = { getCart };