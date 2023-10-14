const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getAllSavedMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// возвращает все сохраненные фильмы
router.get('/', getAllSavedMovies);

// создаёт фильм
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.number().required(),
      description: Joi.string().required(),
      image: Joi.string()
        .required()
        .pattern(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/),
      trailerLink: Joi.string()
        .required()
        .pattern(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/),
      thumbnail: Joi.string()
        .required()
        .pattern(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);

// удаляет фильм
router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteMovie,
);

module.exports = router;
