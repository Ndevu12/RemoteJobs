import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logo, userIconUrl } from "../../assets/images/images";
import FilterForm from "../FilterForm/FilterForm";
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { isLoggedIn, hasAccount, logout } = useAuth();
  const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false);
  const navigate = useNavigate();

  const handleFilterJobs = (filterData: { title?: string }) => {
    if (filterData.title) {
      navigate(`/search-results?title=${filterData.title}`);
    }
  };

  const handleAuthClick = (authType: 'login' | 'signup') => {
    navigate(`/auth?type=${authType}`);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuVisible(!isProfileMenuVisible);
  };

  const handleProfileOptionClick = (option: 'profile' | 'logout' | 'user-jobs') => {
    setIsProfileMenuVisible(false);
    if (option === 'logout') {
      logout();
      navigate('/');
    } else if (option === 'profile') {
      navigate('/profile');
    } else if (option === 'user-jobs') {
      navigate('/user-jobs');
    }
  };

  return (
    <div className="flex flex-wrap md:flex-row md:flex-wrap justify-between items-center p-4 bg-white shadow-md border-b border-gray-300">
      <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
        <img className="w-20 rounded cursor-pointer" src={logo} alt="Company Logo" />
        <span className="ml-4 text-xl font-bold">Remote Jobs</span>
      </div>
      <div className="hidden md:flex items-center flex-grow justify-center">
        <FilterForm filterJobsForm={handleFilterJobs} />
      </div>
      <div className="flex items-center relative mt-4 md:mt-0">
        {isLoggedIn ? (
          <>
            <figure className="profile-photo cursor-pointer" onClick={toggleProfileMenu}>
              <img className="w-10 h-10 rounded-full" src={userIconUrl} alt="Profile" title="Profile" />
            </figure>
            {isProfileMenuVisible && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleProfileOptionClick('profile')}>My Account</li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleProfileOptionClick('user-jobs')}>Jobs</li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleProfileOptionClick('logout')}>Logout</li>
                </ul>
              </div>
            )}
          </>
        ) : hasAccount ? (
          <button className="ml-4 bg-blue-400 text-white px-4 py-2 rounded" onClick={() => handleAuthClick('login')}>
            Login
          </button>
        ) : (
          <button className="ml-4 bg-blue-400 text-white px-4 py-2 rounded" onClick={() => handleAuthClick('signup')}>
            Sign Up
          </button>
        )}
      </div>
      <div className="block md:hidden mt-4 w-full">
        <FilterForm filterJobsForm={handleFilterJobs} />
      </div>
    </div>
  );
};

export default Header;