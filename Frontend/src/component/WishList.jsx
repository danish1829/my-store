import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { removeFromWishlist } from '@/utils/wishListSlice';

const WishList = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  console.log(wishlistItems);

  const handleRemove = async (clothId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5555/clothes/wishlist/${clothId}`,
        { withCredentials: true }
      );
  
      console.log(res?.data?.message);
      dispatch(removeFromWishlist(clothId)); 
    } catch (error) {
      console.error('Failed to remove from wishlist:', error.message);
    }
  };
  
  
  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600 text-xl">
        Your wishlist is empty.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
    <h1 className="text-3xl font-bold mb-6 m-auto">My Wishlist</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {wishlistItems.map((item) => (
        <div
          key={item._id}
          className="border p-4 rounded-xl shadow-md flex flex-col items-center"
        >
          <img
            src={item.images?.[0] || '/placeholder.jpg'}
            alt={item.title}
            className="w-full h-60 object-cover rounded-lg mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
          <p className="text-gray-600 mb-1">Brand: {item.brand}</p>
          <p className="text-gray-600 mb-1">Size: {item.size}</p>
          <p className="text-gray-800 font-bold mb-4">₹{item.price}</p>
          <button
            onClick={() => handleRemove(item._id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  </div>
  )
}

export default WishList