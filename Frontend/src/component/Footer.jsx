import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 justify-evenly">
        
        {/* Logo/Brand */}
        <div>
          <h1 className="text-2xl font-bold">StyleHub</h1>
          <p className="mt-2 text-sm text-gray-400">Your one-stop shop for trendy clothes.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-row space-x-4 font-semi-bold text-xl ml-16">
          <a href="/" className="hover:underline text-gray-300">Home</a>
          <a href="/shop" className="hover:underline text-gray-300">Shop</a>
          <a href="/login" className="hover:underline text-gray-300">Login</a>
          <a href="/signup" className="hover:underline text-gray-300">Signup</a>
        </div>

        {/* Social Links */}
        <div className="flex flex-col space-y-4 ml-40">
          <span className="text-gray-400 text-sm">Follow us</span>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Twitter className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} StyleHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
