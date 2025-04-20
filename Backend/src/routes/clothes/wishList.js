// routes/clothes/wishlistRouter.js
const express = require('express');
const wishlistRouter = express.Router();
const authValidation = require('../../middleware/authValidation');
const User = require('../../models/users');
const Clothes = require('../../models/clothes');

// ✅ Add to wishlist
wishlistRouter.post('/wishlist/:_id', authValidation, async (req, res) => {
    const { _id } = req.params;
    const userId = req.user._id;

    try {
        const cloth = await Clothes.findById(_id);
        if (!cloth) return res.status(404).json({ message: 'Clothing item not found' });

        const user = await User.findById(userId);

        if (user.wishlist.includes(_id)) {
            return res.status(400).json({ message: 'Item already in wishlist' });
        }

        user.wishlist.push(_id);
        await user.save();

        const updatedWishlist = await Clothes.find({ _id: { $in: user.wishlist } });

        res.status(200).json({ message: 'Added to wishlist', wishlist: updatedWishlist });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// ✅ Remove from wishlist
wishlistRouter.delete('/wishlist/:_id', authValidation, async (req, res) => {
    const { _id } = req.params;
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        user.wishlist = user.wishlist.filter(itemId => itemId.toString() !== _id);
        await user.save();

        const updatedWishlist = await Clothes.find({ _id: { $in: user.wishlist } });

        res.status(200).json({ message: 'Removed from wishlist', wishlist: updatedWishlist });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// ✅ Get user's wishlist
wishlistRouter.get('/wishlist', authValidation, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('wishlist');
        res.status(200).json({ wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch wishlist', error: error.message });
    }
});

module.exports = wishlistRouter;
