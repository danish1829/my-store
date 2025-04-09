const mongoose = require('mongoose');

const clothesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    size: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        required: true
    },
    category: {
        type: String,
        enum: ['men', 'women', 'kids', 'unisex'],
        required: true
    },
    condition: {
        type: String,
        enum: ['new', 'like-new', 'good', 'worn'],
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    images: [String], 
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customers',
        required: true
    },
    isSold: {
        type: Boolean,
        default: false, 
        select: false 
    }
}, { timestamps: true });

const clothes = mongoose.model('Clothes', clothesSchema);
module.exports = clothes;
