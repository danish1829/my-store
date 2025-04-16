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

        // Now fetch all cloth details in the wishlist
        const populatedWishlist = await Clothes.find({ _id: { $in: user.wishlist } });

        res.status(200).json({ 
            message: 'Item added to wishlist', 
            wishlist: populatedWishlist 
        });
    } catch (error) {
        res.status(500).json({ message: 'Error adding to wishlist', error: error.message });
    }
});

wishlistRouter.delete('/wishlist/delete/:clothId', authValidation, async (req, res) => {
    const { clothId } = req.params;
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);

        // Check if item exists in wishlist
        if (!user.wishlist.includes(clothId)) {
            return res.status(404).json({ message: 'Item not found in wishlist' });
        }

        // Remove the item
        user.wishlist = user.wishlist.filter(id => id.toString() !== clothId);
        await user.save();

        // Optionally, return updated wishlist with details
        const updatedWishlist = await Clothes.find({ _id: { $in: user.wishlist } });

        res.status(200).json({
            message: 'Item removed from wishlist',
            wishlist: updatedWishlist
        });
    } catch (error) {
        res.status(500).json({ message: 'Error removing from wishlist', error: error.message });
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
