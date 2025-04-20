import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '@/utils/userSlice';
import { addToWishlist, setWishlist } from '@/utils/wishListSlice';

const ClothView = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  const [cloth, setCloth] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const fetchCloth = async () => {
    try {
      const res = await axios.get(`http://localhost:5555/clothes/clothes/${_id}`, {
        withCredentials: true,
      });
      //console.log(res?.data?.data);
      
      setCloth(res?.data?.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCloth();
  }, [_id]);

  useEffect(() => {
    if (cloth?.images?.length) {
      setActiveIndex(0);
    }
  }, [cloth]);

  if (!cloth) return <div className="text-center py-20">Loading...</div>;

  const { images = [], title, price, description, brand, size, available, seller } = cloth;
  //console.log(cloth);
  
  const nextImage = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleAddToCart = () => {
    console.log('Added to cart');
  };

  const handleWishList = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5555/clothes/wishlist/${_id}`,
        {},
        { withCredentials: true }
      );
      if (res?.data?.wishlist) {
        dispatch(setWishlist(res.data.wishlist)); // ✅ update wishlist in store
      }
    } catch (error) {
      console.log("Wishlist Error:", error.message);
    }
  };
  

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10">
      {/* Image Slider */}
      <div className="md:w-1/2 w-full relative">
        <img
          src={images[activeIndex] || '/placeholder.jpg'} // Handle placeholder image gracefully
          alt={`cloth-${activeIndex}`}
          className="w-full h-[500px] object-cover rounded-xl shadow-md transition duration-300"
        />

        {/* Show arrows only if more than 1 image */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
            >
              ◀
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
            >
              ▶
            </button>
          </>
        )}

        {/* Thumbnail indicators only if more than 1 image */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-black' : 'bg-white'}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="md:w-1/2 w-full flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-4">{title}</h1>
          <p className="text-xl text-gray-700 mb-2">Brand: <span className="font-medium">{brand}</span></p>
          <p className="text-xl text-gray-700 mb-2">Size: <span className="font-medium">{size}</span></p>
          <p className="text-xl text-gray-700 mb-2">Price: ₹{price}</p>
          <p className="text-gray-600 mt-4">{description}</p>

          {seller && (
            <div className="mt-6 flex items-center gap-4 border-t pt-4">
              <img
                src={seller.photoURL || "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"}
                alt="img"
                className="w-12 h-12 rounded-full object-cover"
              />
              <p className="text-sm text-gray-700">
                Sold by <span className="font-medium">{seller.fullName}</span>
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-2 rounded-full hover:opacity-90 transition"
          >
            Add to Cart
          </button>
          <button onClick={handleWishList}
            className="border border-black text-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition cursor-pointer"
          >
            Wishlist
          </button>
        </div>

        <p className="mt-4 text-sm text-green-600">
          {available ? 'In stock' : 'Out of stock'}
        </p>
      </div>
    </div>
  );
};

export default ClothView;
