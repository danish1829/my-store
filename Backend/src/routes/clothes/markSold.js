const express = require('express');
const clothControl = express.Router();
const Clothes = require('../../models/clothes');
const authValidation = require('../../middleware/authValidation');

clothControl.patch('/clothes/:id/mark-sold', authValidation, async (req, res) => {
    try {
        const { id } = req.params;

        const cloth = await Clothes.findById(id);
        if (!cloth) {
            return res.status(404).json({ message: 'Cloth not found!' });
        }

        // Check if the logged-in user is the owner
        if (cloth.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not authorized to mark this item as sold.' });
        }

        cloth.isSold = true;
        await cloth.save();

        res.status(200).json({
            message: 'Cloth marked as sold successfully!',
            data: cloth
        });

    } catch (error) {
        console.error('Mark Sold Error:', error.message);
        res.status(500).json({
            message: 'Failed to mark as sold!',
            error: error.message
        });
    }
});

module.exports = clothControl;