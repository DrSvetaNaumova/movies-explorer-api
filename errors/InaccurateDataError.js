const CustomError = require('./CustomError');

module.exports = class InaccurateDataError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
};
