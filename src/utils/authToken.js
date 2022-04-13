const jwt = require('jsonwebtoken');
process.env.JWT_SECRET = 'secret';


const signToken = (data) => {
  return jwt.sign({
    data: data,
    exp: Math.floor(Date.now() / 1000 + 604800) // 60 seconds * 60 minutes * 24 hours * 7 days = 1 week
  }, process.env.JWT_SECRET);
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  signToken,
  verifyToken
};