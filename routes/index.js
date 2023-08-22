const express = require('express');

const router = express.Router();

const auth = require('../middlewares/auth');

router.post('/signup', require('./signup'));
router.post('/signin', require('./login'));

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('*', require('./page404'));

module.exports = router;
