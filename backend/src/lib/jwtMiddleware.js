require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const jwtMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get('access_token');
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    ctx.state.user = {
      _id: decoded._id,
      username: decoded.username
    };

    const now = Math.floor(Date.now()/1000);
    const limit = 60 * 60 * 24 * 3.5;
    if (decoded.exp - now < limit) {
      const user = await User.findById(decoded._id);
      const newToken = user.generateToken();
      ctx.cookies.set('access_token', newToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
      });
    }
    return next();
  } catch (error) {
    return next();
  }
};

module.exports = jwtMiddleware;