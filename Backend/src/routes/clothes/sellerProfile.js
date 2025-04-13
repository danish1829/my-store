const express = require('express');
const sellerProfile = express.Router();
const Clothes = require('../../models/clothes');
const User = require('../../models/users');

// GET clothes by seller ID
sellerProfile.get('/seller/:id', async (req, res) => {
    try {
        const sellerId = req.params.id;

        // Get seller basic info (optional)
        const seller = await User.findById(sellerId).select('fullName photoURL'); // restrict fields as needed
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        // Get seller's clothes
        const clothes = await Clothes.find({ seller: sellerId });

        res.status(200).json({
            seller,
            clothes,
            message: 'Seller profile fetched successfully!',
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch seller profile.', error: error.message });
    }
});

module.exports = sellerProfile;
