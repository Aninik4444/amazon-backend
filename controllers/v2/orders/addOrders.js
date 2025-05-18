const { StatusCodes } = require('http-status-codes');
const Order = require('../../../models/Order');
const Cart = require('../../../models/Cart');

const addOrders = async (req, res) => {
  const userOrder = await Order.findOne({ createdBy: req.user.userId });
  await Cart.deleteMany({ createBy: req.user.userId });
  if (!userOrder) {
    const newOrder = await Order.create({
      createdBy: req.user.userId,
    });
    newOrder.orders.push(req.body);
    await newOrder.save();
    res.status(200).json(newOrder);
  } else {
    userOrder.orders.push(req.body);
    await userOrder.save();
    res.status(StatusCodes.OK).json({ userOrder });
  }
};
module.exports = { addOrders };