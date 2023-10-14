const CustomError = require('./CustomError');

module.exports = class ForbiddenError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
};
