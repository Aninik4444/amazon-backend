const { sendMessage } = require('./messageUtils');
const { addOrderDetails } = require('../../v2/orders/orderUtils');
const User = require('../../../models/User');
const { generateOrderMessage } = require('../../v2/template/messageTemplate');
const getDataAndSendMessage = async (userId, orderData, orderId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            console.error('User not found');
            return;
        }
        // get order data
        const productDetails = await addOrderDetails(orderData);
        const messageData ={
            name:user.name,
            mobile:user.mobile,
            orderId:orderId,    
            products:productDetails.products,
        }
    const messageContent = generateOrderMessage(messageData);
    console.log('Message Content:', messageContent);    
    // sendMessage
    await sendMessage(user.mobile, messageContent);
    } catch (error) {
        console.error('Error in getDataAndSendMessage:', error);
    }
};
module.exports = { getDataAndSendMessage };