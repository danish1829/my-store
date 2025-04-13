const express = require('express');
const filterCloth = express.Router();
const Clothes = require('../../models/clothes');
const authValidation = require('../../middleware/authValidation');

filterCloth.get('/clothes', authValidation, async (req, res) => {
    try {
        const { brand, size, category, condition, minPrice, maxPrice, search } = req.query;

        const filter = {
            isSold: false
        };

        if (brand) filter.brand = brand;
        if (size) filter.size = size;
        if (category) filter.category = category;
        if (condition) filter.condition = condition;

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseInt(minPrice);
            if (maxPrice) filter.price.$lte = parseInt(maxPrice);
        }

        if (search) {
            filter.title = { $regex: search, $options: 'i' }; // case-insensitive title search
        }

        const clothes = await Clothes.find(filter).populate('seller', 'fullName photoURL');
        res.status(200).json({
            data: clothes,
            message: 'Clothes fetched with filters!'
        });

    } catch (error) {
        console.error('Filter Fetch Error:', error.message);
        res.status(500).json({
            message: 'Failed to fetch clothes!',
            error: error.message
        });
    }
});

filterCloth.get('/clothes/:id', authValidation, async (req, res) => {
    try {
        const { id } = req.params;

        const cloth = await Clothes.findOne({ _id: id, isSold: false }).populate('seller', 'fullName photoURL');

        if (!cloth) {
            return res.status(404).json({
                message: 'Cloth not found!'
            });
        }

        res.status(200).json({
            data: cloth,
            message: 'Cloth fetched successfully!'
        });

    } catch (error) {
        console.error('Single Cloth Fetch Error:', error.message);
        res.status(500).json({
            message: 'Failed to fetch cloth!',
            error: error.message
        });
    }
});

module.exports = filterCloth;