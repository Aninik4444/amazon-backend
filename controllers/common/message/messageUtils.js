const twilio = require('twilio');
require('dotenv').config();
const client = new twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

const sendMessage = async (to, body) => {
  try {
    const message = await client.messages.create({
      body: body,
      to: to,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number
    })
    console.log('Message sent successfully:', message.sid);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}
module.exports = { sendMessage };
// client.messages
//   .create({
//     body: 'Hello!',
//     to: '+918368614346', // Your recipient
//     from: '+19787224652'  // Your Twilio number
//   })
//   .then(message => console.log(message.sid));


//   RECOVERY CODE :- 1H9QH9E11HTVK36Z8K4FSXWP