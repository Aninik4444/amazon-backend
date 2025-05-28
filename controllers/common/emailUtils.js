const nodemailer = require('nodemailer');
const {getTemplate} = require('../v2/template/emailTemplate');
const User = require('../../models/User');
require('dotenv').config();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your Gmail address
    pass: process.env.EMAIL_PASS, // app password
  },
});

const sendEmail = async (to, subject, htmlContent) => {
  const mailOptions = {
    from:process.env.EMAIL_USER,
    to,
    subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
 //logic to get user data from userId and  order data
  const sentEmailToUser = async (userId, orderData) => {
  try {
    const user = await User.findById(userId);
    console.log('User:', user);
    if (!user) {
      console.log('User not found');
      return;
    }
  // getTemplate()
  console.log('Order Data:', orderData, user);
  const htmlContent = getTemplate(user, orderData);
  // console.log('HTML Content:', htmlContent);
  // sendEmail()
    // await sendEmail(user.email, 'Your Order Confirmation', htmlContent);
  } catch (error) {
    console.error('Error in sentEmailToUser:', error);
  }
};

module.exports = {sentEmailToUser, sendEmail};
// This code sets up a Nodemailer transporter using Gmail and reads an HTML file to send as the email content.