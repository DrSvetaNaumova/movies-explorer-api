const Movie = require('../models/movie');
const NotFoundDataError = require('../errors/NotFoundDataError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getAllSavedMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    return res.send({ data: movies });
  } catch (err) {
    return next(err);
  }
};

module.exports.createMovie = async (req, res, next) => {
  const { country, director, duration, year, description, image, trailerLink, thumbnail, nameRU, nameEN } = req.body;
  const owner = req.user._id;
  try {
    const movie = await Movie.create({ country, director, duration, year, description, image, trailerLink, thumbnail, nameRU, nameEN, owner });
    return res.status(201).send({ data: movie });
  } catch (err) {
    return next(err);
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId).orFail(
      new NotFoundDataError('Фильм не существует.'),
    );
    if (String(movie.owner) !== String(req.user._id)) {
      throw new ForbiddenError('Нет прав для удаления фильма.');
    }
    await movie.deleteOne();
    return res.status(200).send(movie);
  } catch (err) {
    return next(err);
  }
};
