const CustomError = require('./CustomError');

module.exports = class ConflictUserError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
};
