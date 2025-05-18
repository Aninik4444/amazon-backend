const { StatusCodes } = require('http-status-codes');
const Order = require('../../../models/Order');

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const userOrder = await Order.findOne({ createdBy: req.user.userId });
  if (!userOrder) {
    res.status(StatusCodes.NOT_FOUND).json('No Orders found for user');
  } else {
    const index = userOrder.orders.findIndex(
      (order) => order._id.toString() == id
    );

    if (index === -1) {
      res.status(StatusCodes.NOT_FOUND).json('Order not found for user');
    } else {
      let order = userOrder.orders[index];
      order.orderStatus = req.body.status;
      order.lastUpdatedAt = Date.now();
      userOrder.orders[index] = order;
      userOrder.save();
      res.status(StatusCodes.OK).json({ userOrder });
    }
  }
};
module.exports = { updateOrder };