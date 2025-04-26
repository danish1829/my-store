import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addUser, removeUser }  from "../utils/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.user?.data);
  const wishlistItems = useSelector((state) => state.wishlist.items || []);

  //console.log(user);
  const { photoURL } = user || {}
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const res = await axios.post('http://localhost:5555/users/signup', 
        { fullName , photoURL ,gender , email , password },
        { withCredentials : true }
      )

      //console.log(res?.data);
      dispatch(addUser(res?.data));
      
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5555/users/login' , 
        { email, password },
        {withCredentials : true} 
      );
      //console.log(res?.data);
      dispatch(addUser(res?.data))
    } catch (error) {
      console.log(error.message);
      
    }
  }

  const handleSignOut = async () => {
    try {
      await axios.post(
        'http://localhost:5555/users/logout',
        {}, 
        { withCredentials: true } 
      );
      dispatch(removeUser());
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <header className="bg-white shadow-xl">
      <nav className="max-w-6xl mx-auto flex justify-between items-center p-4 rounded-lg">
        {/* Logo or site name */}
        <Link to="/"><div className="text-xl font-semibold text-gray-700">MyClothStore</div></Link>

        {/* Navigation Links */}
        <div className="space-x-4 ml-150">
          {/* Shop Now Button */}
          <Link to="/shopping">
            <Button
              variant="primary"
              className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
            >
              Shop Now
            </Button>
          </Link>

          {/* Login/Signup Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Sign in / Sign out</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-center">
                  {isSignUp ? "Sign Up" : "Login Here"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {isSignUp && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="fullname" className="text-right">
                        Full Name
                      </Label>
                      <Input id="fullname" placeholder="Your Name" className="col-span-3" value = {fullName} onChange = {(e)=>setFullName(e.target.value)}/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="photo" className="text-right">
                        Photo URL
                      </Label>
                      <Input id="photo" placeholder="Photo URL" className="col-span-3" value = {photoUrl} onChange = {(e)=>setPhotoUrl(e.target.value)}/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="gender" className="text-right">
                        Gender
                      </Label>
                      <Input id="gender" placeholder="Photo URL" className="col-span-3" value = {gender} onChange = {(e)=>setGender(e.target.value)}/>
                    </div>
                  </>
                )}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" placeholder="example@mail.com" className="col-span-3" 
                  value = {email} onChange = {(e)=> setEmail(e.target.value)}/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="col-span-3"
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
              <Button type="submit" className="mx-auto cursor-pointer" onClick={isSignUp ? handleSignUp : handleLogin}>
              {isSignUp ? "Sign Up" : "Login"}
              </Button>

              </DialogFooter>
              <p
                className="mx-auto mt-2 text-sm text-blue-500 cursor-pointer hover:underline text-center"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Already have an account? Login" : "New Here? Sign up"}
              </p>
              <p  onClick={handleSignOut}       
               className="mx-auto mt-2 text-sm text-blue-500 cursor-pointer hover:underline text-center">
                Sign out</p>
            </DialogContent>
          </Dialog>
            
        </div>
        <div>
        <Link to='/user/profile'><img className='rounded-full w-10'
             src={photoURL || "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"} alt="profile-img" /></Link>
        </div>
        <Link to='/user/wishlist' className="relative">
  <div className="text-red-500 text-2xl cursor-pointer">❤️</div>
  {wishlistItems.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
      {wishlistItems.length}
    </span>
  )}
</Link>
      </nav>
    </header>
  );
};

export default Navbar;
