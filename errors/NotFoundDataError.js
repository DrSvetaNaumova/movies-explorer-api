const CustomError = require('./CustomError');

module.exports = class NotFoundDataError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
};
