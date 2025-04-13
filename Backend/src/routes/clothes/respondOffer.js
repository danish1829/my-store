const express = require('express');
const respondOffer = express.Router();
const Offer = require('../../models/offerSchema');
const authValidation = require('../../middleware/authValidation');

respondOffer.post('/offer/:id/respond', authValidation, async (req, res) => {
    const { status, counterOffer } = req.body; // status = 'accepted' | 'rejected' | 'countered'

    try {
        const offer = await Offer.findById(req.params.id);
        if (!offer) return res.status(404).json({ message: 'Offer not found' });

        if (offer.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized to respond to this offer.' });
        }

        offer.status = status;
        if (status === 'countered' && counterOffer) {
            offer.counterOffer = counterOffer;
        }

        await offer.save();
        res.status(200).json({ message: `Offer ${status} successfully`, offer });
    } catch (error) {
        res.status(500).json({ message: 'Failed to respond to offer', error: error.message });
    }
});

module.exports = respondOffer;
