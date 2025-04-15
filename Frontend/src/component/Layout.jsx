import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addUser } from '../utils/userSlice'

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

  return (
    <div>
        <Navbar />
        <main>
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default Layout