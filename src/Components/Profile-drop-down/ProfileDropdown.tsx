import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConfirmBox from '../Confirm-box/ConfirmBox';
const ProfileDropDown = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const userDetails = useSelector((state: RootState) => state.authSliceReducer.userDetails);
  console.log(userDetails, 'ggjhghg');

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    navigate("/")
    console.log(userDetails,'userdetails in logout');
    
  }

  const deleteAccount = async () => {
    try {
      const userId = localStorage.getItem("id");
      const apiResponse = await axios.delete(`${process.env.REACT_APP_API_PREFIX}/users/${userId}`)
      logout();
    } catch (error) {
      console.error("Error deleting account:", error);
      throw error; 
    }
  };
  
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-600 bg-blue-700 rounded-full border-none"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          {userDetails?.first_name.charAt(0).toUpperCase()}
        </button>
      </div>
      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            <p className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="menu-item-1">
              {userDetails?.first_name + ' ' + userDetails?.last_name}
            </p>
            <Link to={"/wishlist"} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="menu-item-2">
              Wishlist
            </Link>
            <button type='button' onClick={()=>setOpenConfirmBox(true)} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="menu-item-0">
              Delete Account
            </button>
            <button type="submit" onClick={logout} className="block w-full px-4 py-2 text-left text-sm text-gray-700" role="menuitem" id="menu-item-3">
              Log out
            </button>
          </div>
        </div>
      )}
      <ConfirmBox open={openConfirmBox} setOpen={setOpenConfirmBox} deleteAccount={deleteAccount} message="delete your account" heading="Delete Account"/>
    </div>
  );
};

export default ProfileDropDown