const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Поле "country" должно быть заполнено'],
    },

    director: {
      type: String,
      required: [true, 'Поле "director" должно быть заполнено'],
    },

    duration: {
      type: Number,
      required: [true, 'Поле "duration" должно быть заполнено'],
    },

    year: {
      type: Number,
      required: [true, 'Поле "year" должно быть заполнено'],
    },

    description: {
      type: String,
      required: [true, 'Поле "description" должно быть заполнено'],
    },

    image: {
      type: String,
      required: [true, 'Поле "image" должно быть заполнено'],
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Неправильный формат Url',
      },
    },

    trailerLink: {
      type: String,
      required: [true, 'Поле "trailerLink " должно быть заполнено'],
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Неправильный формат Url',
      },
    },

    thumbnail: {
      type: String,
      required: [true, 'Поле "thumbnail" должно быть заполнено'],
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Неправильный формат Url',
      },
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user', // необходимо для правильной работы метода populate, который объединяет объекты из разных коллекций БД.
    },

    nameRU: {
      type: String,
      required: [true, 'Поле "nameRU" должно быть заполнено'],
    },

    nameEN: {
      type: String,
      required: [true, 'Поле "nameEN" должно быть заполнено'],
    },

    // NEW!
    movieId: {
      type: Number,
      required: [true, 'Поле "movieId" должно быть заполнено'],
    },
  },

  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
