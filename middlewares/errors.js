const CustomError = require('../errors/CustomError');

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function errorHandler(err, req, res, next) {
  if (err instanceof CustomError) { // проверка, что это моя типизированная ошибка
    res.status(err.statusCode).send({
      message: err.message,
    });
  } else {
    res.status(500).send({
      message: 'Произошла внутренняя ошибка на сервере',
    });
  }
}

module.exports = { logErrors, errorHandler };
