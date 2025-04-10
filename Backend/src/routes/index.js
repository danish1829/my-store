const express = require('express');
const router = express.Router();
const userRouter = require('./users/auth');

// Clothes routes
router.use('/clothes', require('./clothes/upload'));
router.use('/clothes', require('./clothes/getAll'));
router.use('/clothes', require('./clothes/getSingle'));
router.use('/clothes', require('./clothes/myClothes'));
router.use('/clothes', require('./clothes/markSold'));
router.use('/clothes', require('./clothes/delete'));
router.use('/clothes', require('./clothes/update'));

// User routes
router.use('/users', userRouter);

module.exports = router;
