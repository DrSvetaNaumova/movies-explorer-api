const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCurrentUserInfo,
  updateUserNameAndEmail,
} = require('../controllers/users');

// возвращает текущего пользователя
router.get('/me', getCurrentUserInfo);

// обновляет профиль пользователя
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
    }),
  }),
  updateUserNameAndEmail,
);

module.exports = router;
