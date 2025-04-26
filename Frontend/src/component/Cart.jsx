import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "@/utils/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty 🛒</h2>
        <Link
          to="/"
          className="text-white bg-black px-6 py-2 rounded-full hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-12">
      <h1 className="text-3xl font-bold mb-8 text-center">My Cart</h1>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <div key={item._id} className="flex flex-col md:flex-row items-center p-6 gap-6">
              <img
                src={item.images[0] || "/placeholder.jpg"}
                alt={item.title}
                className="w-32 h-32 object-cover rounded-lg shadow-md"
              />
              <div className="flex-1 w-full">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-500 mt-1">{item.brand}</p>
                <p className="text-md font-bold mt-2">₹{item.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">-</button>
                <span className="px-3">{item.quantity}</span>
                <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">+</button>
              </div>

              <button
                onClick={() => handleRemove(item._id)}
                className="text-red-500 hover:underline text-sm mt-4 md:mt-0"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Summary */}
        <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-lg font-semibold">
            Total: ₹{totalAmount.toFixed(2)}
          </div>
          <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
