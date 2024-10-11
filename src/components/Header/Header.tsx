import React, { useEffect, useState } from 'react';
import { logo, userIconUrl } from "../../assets/images/images";
import FilterForm from "../FilterForm/FilterForm";

interface HeaderProps {
  onFilterJobs: (filterData: { title?: string }) => void;
  onProfileClick: () => void;
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onFilterJobs, onProfileClick, onLogoClick }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleFilterJobs = (filterData: { title?: string }) => {
    onFilterJobs(filterData);
  };

  return (
    <div className="flex flex-wrap justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center">
        <img className="w-20 rounded cursor-pointer" src={logo} alt="Company Logo" onClick={onLogoClick} />
        <span className="ml-4 text-xl font-bold">Remote Jobs</span>
      </div>
      <FilterForm filterJobsForm={handleFilterJobs} />
      <div className="flex items-center">
        {isLoggedIn ? (
          <figure className="profile-photo cursor-pointer" onClick={onProfileClick}>
            <img className="w-10 h-10 rounded-full" src={userIconUrl} alt="Profile" title="Profile" />
          </figure>
        ) : (
          <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={onProfileClick}>
            Sign In / Sign Up
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;