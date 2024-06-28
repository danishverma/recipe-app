import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { UserDetails } from '../common/Interfaces';
import { useNavigate } from 'react-router-dom';
const ProfileDropDown = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails>()
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const userId = useSelector((state: RootState)=> state.authSliceReducer.userDetails)
  console.log(userId, 'userId');
  
  useEffect(()=>{
    const apiResponse = async() => {
      try {
        const user = await axios.get(`${process.env.REACT_APP_API_PREFIX}/users/${userId}`).catch((err)=>{
          throw err
        })
        setUserDetails(user.data.data.data)
        
      } catch (error) {
        throw error
      }
    }
    apiResponse()
  },[userId])
  const logout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }
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
            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="menu-item-1">
              {userDetails?.first_name+' '+userDetails?.last_name}
            </a>
            {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="menu-item-2">
              License
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="menu-item-0">
              Account settings
            </a> */}
            {/* <form method="POST" action="#" role="none"> */}
              <button type="submit" onClick={logout} className="block w-full px-4 py-2 text-left text-sm text-gray-700" role="menuitem" id="menu-item-3">
                Log out
              </button>
            {/* </form> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown