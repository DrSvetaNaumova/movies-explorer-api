const router = require('express').Router();
const NotFoundDataError = require('../errors/NotFoundDataError');

router.all('*', (_req, res, next) => {
  next(new NotFoundDataError('Нет такой страницы!'));
});

module.exports = router;
