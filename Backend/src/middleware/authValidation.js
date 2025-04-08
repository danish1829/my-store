const jwt = require('jsonwebtoken');
const User = require('../models/users'); 

const authValidation = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: 'Access denied. Token not found.' });
    }

    const decoded = jwt.verify(token, "AMAN");
    const { _id } = decoded;

    const user = await User.findById(_id).select('-password'); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authValidation;
