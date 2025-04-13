const express = require('express');
const requestOffer = express.Router();
const Offer = require('../../models/offerSchema');
const Clothes = require('../../models/clothes');
const authValidation = require('../../middleware/authValidation');

requestOffer.post('/offer', authValidation, async (req, res) => {
    const { clothId, offeredPrice } = req.body;

    try {
        const cloth = await Clothes.findById(clothId);
        if (!cloth) return res.status(404).json({ message: 'Cloth not found' });

        if (cloth.seller.toString() === req.user._id.toString()) {
            return res.status(400).json({ message: 'You cannot make an offer on your own item.' });
        }

        const offer = await Offer.create({
            buyer: req.user._id,
            seller: cloth.seller,
            cloth: clothId,
            offeredPrice,
        });

        res.status(201).json({ message: 'Offer made successfully!', offer });
    } catch (error) {
        res.status(500).json({ message: 'Failed to make offer', error: error.message });
    }
});

module.exports = requestOffer;
