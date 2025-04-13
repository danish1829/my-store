const express = require('express');
const updatedCloth = express.Router();
const Clothes = require('../../models/clothes');
const authValidation = require('../../middleware/authValidation');

updatedCloth.patch('/clothes/:id', authValidation, async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      const cloth = await Clothes.findById(id).populate('seller');
  
      if (!cloth) {
        return res.status(404).json({ message: 'Cloth not found!' });
      }
      
      // Check if current user is the seller
      if (!cloth.seller.equals(req.user._id)) {
        return res.status(403).json({ message: 'You are not authorized to update this item.' });
      }
      
      // Update only allowed fields
      const allowedUpdates = ['title', 'description', 'price', 'condition', 'size', 'brand', 'category'];
      allowedUpdates.forEach(field => {
        if (updates[field] !== undefined) {
          cloth[field] = updates[field];
        }
      });
  
      const updatedCloth = await cloth.save();
  
      res.status(200).json({
        message: 'Cloth updated successfully!',
        data: updatedCloth
      });
  
    } catch (error) {
      console.error('Update Error:', error.message);
      res.status(500).json({
        message: 'Failed to update cloth!',
        error: error.message
      });
    }
  });

module.exports = updatedCloth;