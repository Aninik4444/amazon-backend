const User = require('../../models/User');
const { addOrderDetails } = require('../v2/orders/orderUtils');
const{ getTemplate } = require('../v2/template/emailTemplate');
const { sendEmail } = require('./emailUtils');
const getDataAndSendEmail = async (userId, orderData, orderId) => {
  try {
    const user = await User.findById(userId);
    console.log('User:', user);
    if (!user) {
      console.log('User not found');
      return;
    }
    // get order data
    const productDetails = await addOrderDetails(orderData);
    const templateData = {
      name: user.name,
      email: user.email, 
      orderId: orderId,
      products: productDetails.products,
    }
  const htmlContent = getTemplate(templateData);
  console.log('HTML Content:', htmlContent);
  // sendEmail()
   await sendEmail(user.email, 'Your Order Confirmation', htmlContent);
  } catch (error) {
    console.error('Error in sentEmailToUser:', error);
  }
}
module.exports = { getDataAndSendEmail };