const { StatusCodes } = require('http-status-codes');
const Order = require('../../../models/Order');
const Cart = require('../../../models/Cart');
const { getDataAndSendEmail } = require('../../common/getDataAndSendEmail');
const { getDataAndSendMessage } = require('../../common/message/getDataAndSendMessage');

const addOrders = async (req, res) => {
  const userOrder = await Order.findOne({ createdBy: req.user.userId });
  await Cart.deleteMany({ createBy: req.user.userId });

  if (!userOrder) {
    const newOrder = await Order.create({
      createdBy: req.user.userId,
    });

    newOrder.orders.push(req.body);
    const resData = await newOrder.save();
    // get product details
    // await getDataAndSendEmail(req.user.userId, req.body, resData._id);
    // send message
    await getDataAndSendMessage(req.user.userId, req.body, resData._id);
    return res.status(200).json(newOrder);
  } else {
    userOrder.orders.push(req.body);
    const resData = await userOrder.save();
    // await getDataAndSendEmail(req.user.userId, req.body, resData._id);
    await getDataAndSendMessage(req.user.userId, req.body, resData._id);
    return res.status(StatusCodes.OK).json({ userOrder });
  }
};

module.exports = { addOrders };
