const { StatusCodes } = require('http-status-codes');
const User = require('../../../models/User');

const signup = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.generateJWT();
  res.status(200).json({ token });
};
module.exports = { signup };