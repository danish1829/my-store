const express = require('express');
const deleteClothes = express.Router();
const Clothes = require('../../models/clothes');
const authValidation = require('../../middleware/authValidation');

deleteClothes.delete('/clothes/:id', authValidation, async (req, res) => {
    try {
      const { id } = req.params;
  
      const cloth = await Clothes.findById(id);
  
      if (!cloth) {
        return res.status(404).json({ message: 'Cloth not found!' });
      }
  
      // Check if the logged-in user is the seller
      if (cloth.seller.toString() !== req.user._id) {
        return res.status(403).json({ message: 'You are not authorized to delete this item.' });
      }
  
      await Clothes.findByIdAndDelete(id);
  
      res.status(200).json({ message: 'Cloth deleted successfully!' });
  
    } catch (error) {
      console.error('Delete Error:', error.message);
      res.status(500).json({
        message: 'Failed to delete cloth!',
        error: error.message
      });
    }
  });

  module.exports = deleteClothes;