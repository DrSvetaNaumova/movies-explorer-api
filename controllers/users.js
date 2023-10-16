const User = require('../models/user');
const NotFoundDataError = require('../errors/NotFoundDataError');
const ConflictUserError = require('../errors/ConflictUserError');

module.exports.updateUserNameAndEmail = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    let user;
    try {
      user = await User.findByIdAndUpdate(
        req.user._id,
        { name, email },
        { new: true, runValidators: true },
      ).orFail(new NotFoundDataError('Пользователь не существует'));
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictUserError(
          'Пользователь с данным email уже зарегистрирован.',
        );
      } else {
        throw err;
      }
    }
    return res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
};

module.exports.getCurrentUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail(
      new NotFoundDataError('Пользователь не существует'),
    );
    return res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
};
