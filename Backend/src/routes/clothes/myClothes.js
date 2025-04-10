const express = require('express');
const clothRouter = express.Router();
const Clothes = require('../../models/clothes');
const authValidation = require('../../middleware/authValidation');

clothRouter.get('/clothes/my-clothes', authValidation, async (req, res) => {
    try {
        const myClothes = await Clothes.find({ seller: req.user._id });
        res.status(200).json({
            data: myClothes,
            message: 'Your clothes fetched successfully!'
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch your clothes.', error: error.message });
    }
});

module.exports = clothRouter;