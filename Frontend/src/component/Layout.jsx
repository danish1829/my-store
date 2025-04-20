import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addUser } from '../utils/userSlice'
import { setWishlist } from '@/utils/wishListSlice'

const Layout = () => {

  const user = useSelector((store) => store?.user?.data);
  const dispatch = useDispatch();

  const loginUser = async () => {
    if(user){
      return;
    }
    try {
      const res = await axios.get('http://localhost:5555/users/profile/view', 
        {withCredentials : true}
      );
      dispatch(addUser(res?.data));
    } catch (error) {
      console.log(error.message);
      
    }
  }

  useEffect(()=>{
    loginUser();
  },[])

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(`http://localhost:5555/clothes/wishlist`, {
          withCredentials: true,
        });
        if (res?.data?.wishlist) {
          dispatch(setWishlist(res.data.wishlist));
        }
      } catch (err) {
        console.log("Wishlist fetch failed:", err.message);
      }
    };
  
    fetchWishlist();
  }, []);
  

  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar />
        <main className='flex-1'>
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default Layout