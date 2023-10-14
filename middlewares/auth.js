const jwt = require('jsonwebtoken');
const UnauthorizedUserError = require('../errors/UnauthorizedUserError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedUserError('Необходима авторизация');
    }

    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    } catch (err) {
      throw new UnauthorizedUserError('Необходима авторизация');
    }

    req.user = payload;

    return next();
  } catch (err) {
    return next(err);
  }
};
