const express = require('express');
const clothRouter = express.Router();
const Clothes = require('../../models/clothes');
const authValidation = require('../../middleware/authValidation');

clothRouter.get('/clothes',authValidation ,async (req, res) => {
    try {
        const clothes = await Clothes.find({ isSold: false }).populate('seller', 'fullName photoURL');
        res.status(200).json({
            data: clothes,
            message: 'Clothes fetched successfully!'
        });
    } catch (error) {
        console.error('Fetch Error:', error.message);
        res.status(500).json({
            message: 'Failed to fetch clothes!',
            error: error.message
        });
    }
});

module.exports = clothRouter;