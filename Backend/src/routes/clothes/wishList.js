const express = require('express');
const wishlistRouter = express.Router();
const authValidation = require('../../middleware/authValidation');
const User = require('../../models/users');
const Clothes = require('../../models/clothes');

wishlistRouter.post('/wishlist/:clothId', authValidation, async (req, res) => {
    const { clothId } = req.params;
    const userId = req.user._id;

    try {
        const cloth = await Clothes.findById(clothId);
        if (!cloth) {
            return res.status(404).json({ message: 'Clothing item not found' });
        }

        const user = await User.findById(userId);

        if (user.wishlist.includes(clothId)) {
            return res.status(400).json({ message: 'Item already in wishlist' });
        }

        user.wishlist.push(clothId);
        await user.save();

        res.status(200).json({ message: 'Item added to wishlist', wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: 'Error adding to wishlist', error: error.message });
    }
});

wishlistRouter.get('/wishlist', authValidation, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('wishlist');
        res.status(200).json({ wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch wishlist', error: error.message });
    }
});


module.exports = wishlistRouter;
