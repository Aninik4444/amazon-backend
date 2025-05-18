
const { StatusCodes } = require('http-status-codes');
const Order = require('../../../models/Order');
const { addOrderDetails } = require('./orderUtils');
const getOrder = async (req, res) => {
  const userOrder = await Order.findOne({ createdBy: req.user.userId })
    .lean()
    .exec();
    console.log({userOrder});
  if (!userOrder) {
    res.status(StatusCodes.NOT_FOUND).json('No orders found for user');
  } else {
    let flag = false;
    await userOrder.orders.forEach(async (order) => {
      if (order._id == req.params.id) {
        flag = true;
        const newOrder = await addOrderDetails(order);
        res.status(StatusCodes.OK).json(newOrder);
      }
    });
    if (flag === false) {
      throw new Error('Order not found for user');
    }
  }
};
module.exports = { getOrder };