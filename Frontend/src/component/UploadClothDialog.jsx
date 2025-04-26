import { setClothes } from "@/utils/clothSlice";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const UploadClothDialog = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  
  const [clothData, setClothData] = useState({
    title: "",
    brand: "",
    size: "",
    category: "",
    condition: "",
    description: "",
    price: "",
    images: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setClothData({ ...clothData, images: files });
    } else {
      setClothData({ ...clothData, [name]: value });
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("title", clothData.title);
      formData.append("brand", clothData.brand);
      formData.append("size", clothData.size);
      formData.append("category", clothData.category);
      formData.append("condition", clothData.condition);
      formData.append("description", clothData.description);
      formData.append("price", clothData.price);

      if (clothData.images) {
        for (let i = 0; i < clothData.images.length; i++) {
          formData.append("images", clothData.images[i]);
        }
      }

      const res = await axios.post('http://localhost:5555/clothes/upload', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });

      dispatch(setClothes(res?.data?.data));
      console.log("Upload Success ✅", res?.data);

      onClose(); // Close dialog after upload
    } catch (error) {
      console.error("Upload Error ❌", error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl w-[90%] max-w-lg shadow-xl relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4">Upload Cloth Details</h2>

        {/* Removed form tag */}
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={clothData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={clothData.brand}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <select
            name="size"
            value={clothData.size}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Size</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>

          <select
            name="category"
            value={clothData.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
            <option value="unisex">Unisex</option>
          </select>

          <select
            name="condition"
            value={clothData.condition}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Condition</option>
            <option value="new">New</option>
            <option value="like-new">Like New</option>
            <option value="good">Good</option>
            <option value="worn">Worn</option>
          </select>

          <textarea
            name="description"
            placeholder="Description"
            value={clothData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="3"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={clothData.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="w-full cursor-pointer"
            required
          />

          <button
            onClick={handleUpload}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadClothDialog;
