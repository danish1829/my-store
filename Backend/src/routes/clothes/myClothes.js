const express = require('express');
const myClothes = express.Router();
const Clothes = require('../../models/clothes');
const authValidation = require('../../middleware/authValidation');

myClothes.get('/my-clothes', authValidation, async (req, res) => {
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

module.exports = myClothes;