import { addUser } from "@/utils/userSlice";
import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios"; // also make sure you have imported axios!
import UploadClothDialog from "./UploadClothDialog";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.user?.data);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const loginUser = async () => {
    if (user) {
      return;
    }
    try {
      const res = await axios.get('http://localhost:5555/users/profile/view', {
        withCredentials: true,
      });
      dispatch(addUser(res?.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    loginUser();
  }, []);

  // Always AFTER hooks
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 md:px-20">
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-10 max-w-6xl mx-auto">
        
        {/* Left: Profile Info */}
        <div className="w-full md:w-1/3 flex flex-col items-center text-center border-r border-gray-200">
          <img
            src={user?.photoURL || "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-black shadow-md"
          />
          <h2 className="text-2xl font-bold mt-4">{user?.fullName}</h2>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-gray-500 text-sm mt-1">{user?.gender}</p>
          <p className="text-gray-500 text-sm mt-1">{user?.address}</p>
          <button className="mt-6 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition">
            Edit Profile
          </button>
        </div>

        {/* Right: Other content */}
        <div className="w-full md:w-2/3 space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold">Account Overview</h3>
            <p className="text-sm text-gray-500 mt-1">
              View and manage your personal info, orders, and wishlist.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
              <h4 className="text-lg font-medium mb-2">Orders</h4>
              <p className="text-sm text-gray-600">You have 5 recent orders.</p>
              <button className="mt-2 text-sm text-blue-600 hover:underline">View Orders</button>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
              <h4 className="text-lg font-medium mb-2">Cart</h4>
              <p className="text-sm text-gray-600">3 items in your wishlist.</p>
              <Link to='/user/cart'><button className="mt-2 text-sm text-blue-600 hover:underline">View Cart</button></Link>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
              <h4 className="text-lg font-medium mb-2">Address Book</h4>
              <p className="text-sm text-gray-600">Manage your shipping addresses.</p>
              <button className="mt-2 text-sm text-blue-600 hover:underline">Manage</button>
            </div>
            <>
            <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
              <h4 className="text-lg font-medium mb-2">Upload Cloths</h4>
              <p className="text-sm text-gray-600">You need to give the cloths detail here.</p>
              <button onClick={openDialog}
              className="mt-2 text-sm text-blue-600 hover:underline">Upload</button>
            </div>
            <UploadClothDialog isOpen={isDialogOpen} onClose={closeDialog} />
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
