const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cloth: { type: mongoose.Schema.Types.ObjectId, ref: 'Clothes', required: true },
    offeredPrice: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['pending', 'accepted', 'rejected', 'countered'], 
        default: 'pending' 
    },
    counterOffer: { type: Number }, // optional field for seller's counter
}, { timestamps: true });

const offer = mongoose.model('Offer', offerSchema);
module.exports = offer;
