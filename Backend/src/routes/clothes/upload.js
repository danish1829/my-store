const express = require('express');
const clothRouter = express.Router();
const Clothes = require('../../models/clothes');
const authValidation = require('../../middleware/authValidation');
const upload = require('../../middleware/multer');

clothRouter.post('/upload', authValidation, upload.array('images', 5), async (req, res) => {
    try {
        const { title, brand, size, category, condition, description, price } = req.body;
        const imageUrls = req.files.map(file => file.path);

        const newCloth = new Clothes({
            title,
            brand,
            size,
            category,
            condition,
            description,
            price,
            images: imageUrls,
            seller: req.user._id
        });

        const saved = await newCloth.save();
        res.status(201).json({
            data: saved,
            message: 'Cloth uploaded successfully!'
        });

    } catch (error) {
        console.log('Upload Error:', error);
        res.status(500).json({
            message: 'Upload failed!',
            error: error.message
        });
    }
    
});

module.exports = clothRouter;