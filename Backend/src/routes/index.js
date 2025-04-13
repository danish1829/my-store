const express = require('express');
const router = express.Router();
const userRouter = require('./users/auth');
const uploadClothes = require('./clothes/upload');
const getAllClothes = require('./clothes/getAll');
const filterCloth = require('./clothes/getSingle');
const myClothes = require('./clothes/myClothes');
const deleteClothes = require('./clothes/delete');
const markSold = require('./clothes/markSold');
const updatedCloth = require('./clothes/update');
const sellerProfile = require('./clothes/sellerProfile');
const requestOffer = require('./clothes/makeOffer');
const respondOffer = require('./clothes/respondOffer');
const wishlistRouter = require('./clothes/wishList');

// Clothes routes
router.use('/clothes', uploadClothes);
router.use('/clothes', getAllClothes);
router.use('/clothes', filterCloth);
router.use('/clothes', myClothes);
router.use('/clothes', deleteClothes);
router.use('/clothes', markSold);
router.use('/clothes', updatedCloth);
router.use('/clothes', requestOffer);
router.use('/clothes', respondOffer);
router.use('/clothes', wishlistRouter);
router.use('/user', sellerProfile);


// User routes
router.use('/users', userRouter);

module.exports = router;
