const CustomError = require('./CustomError');

module.exports = class UnauthorizedUserError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
};
