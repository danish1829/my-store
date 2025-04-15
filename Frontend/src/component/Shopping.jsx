import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setClothes } from '../utils/clothSlice';
import ClothingCard from './ClothingCard';

const Shopping = () => {
  const dispatch = useDispatch();
  const clothesData = useSelector((store) => store?.clothes?.allClothes || []);

  const [price, setPrice] = useState(5000);
  const [searchBrand, setSearchBrand] = useState('');

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5555/clothes/getclothes', {
        withCredentials: true,
      });
      dispatch(setClothes(res?.data?.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredClothes = clothesData
    .filter((item) => item.price <= price)
    .filter((item) =>
      item.brand?.toLowerCase().includes(searchBrand.toLowerCase())
    );

  return (
    <div className="flex flex-col md:flex-row p-6">
      {/* Filter Sidebar */}
      <div className="md:w-1/4 w-full mb-6 md:mb-0 md:mr-6 ml-12">
        <div className="p-4 border rounded-md mb-6">
          <label className="block font-semibold mb-2">Price Range: ₹{price}</label>
          <input
            type="range"
            min="0"
            max="5000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="p-4 border rounded-md">
          <label className="block font-semibold mb-2">Search by Brand:</label>
          <input
            type="text"
            placeholder="e.g. Zara, H&M..."
            value={searchBrand}
            onChange={(e) => setSearchBrand(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="ml-24 md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
        {filteredClothes.length > 0 ? (
          filteredClothes.map((item) => (
            <ClothingCard key={item._id} data={item} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No matching clothes found.</p>
        )}
      </div>
    </div>
  );
};

export default Shopping;
