import React from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom"; 

const Navbar = () => {
  return (
    <header className="bg-white shadow-xl">
      <nav className="max-w-6xl mx-auto flex justify-between items-center p-4">
        {/* Logo or site name */}
        <div className="text-xl font-semibold text-gray-700">MyClothStore</div>
        
        {/* Navigation Links */}
        <div className="space-x-4">
          {/* Shop Now Button */}
          <Link to="">
            <Button variant="primary" className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 cursor-pointer">
              Shop Now
            </Button>
          </Link>

          {/* Login/Signup Buttons */}
          <Link to="">
            <Button variant="secondary" className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer">
              Login
            </Button>
          </Link>

          <Link to="">
            <Button variant="secondary" className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer">
              Signup
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
