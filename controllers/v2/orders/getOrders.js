const { StatusCodes } = require('http-status-codes');
const Order = require('../../../models/Order');
const { addOrderDetails } = require('./orderUtils');
const getOrders = async (req, res) => {
  const orders = await Order.findOne({ createdBy: req.user.userId })
    .populate('createdBy', 'name email') 
    .lean()
    .exec();

  if (!orders) {
    return res.status(StatusCodes.OK).json('This user has no orders');
  }

  orders.orders.sort((a, b) => (a.orderedAt > b.orderedAt ? -1 : 1));

  const newOrders = await Promise.all(
    orders.orders.map(async (order) => addOrderDetails(order))
  );

  
  res.status(StatusCodes.OK).json({ 
    orders: newOrders,
    user: orders.createdBy  
  });
};
