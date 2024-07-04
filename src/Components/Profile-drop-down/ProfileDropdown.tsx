import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { error } from 'console';
const ProfileDropDown = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const userDetails = useSelector((state: RootState) => state.authSliceReducer.userDetails);
  console.log(userDetails, 'ggjhghg');

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    navigate("/")
  }

  const deleteAccount = async () => {
    const userId = localStorage.getItem("id")
    try {
      const apiResponse = await axios.delete(`${process.env.REACT_APP_API_PREFIX}/users/${userId}`).catch((err) => {
        throw err
      })
      logout()
    } catch (error) {
      throw error
    }
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
            <a href="" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="menu-item-1">
              {userDetails?.first_name + ' ' + userDetails?.last_name}
            </a>
            <a href="" onClick={() => navigate("/wishlist")} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="menu-item-2">
              Wishlist
            </a>
            <a href="" onClick={deleteAccount} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="menu-item-0">
              Delete Account
            </a>
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