import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="h-full w-full flex flex-col items-center justify-center py-10 px-4 bg-white">
      <h1 className="text-primary text-4xl md:text-6xl font-bold mb-4">404</h1>
      <p className="text-primary text-lg md:text-2xl font-medium text-center mb-6">Page Not Found</p>
      <button onClick={handleGoBack} className="text-secondary text-sm md:text-lg font-medium underline cursor-pointer">
        Go back to the previous page
      </button>
    </div>
  );
};

export default NotFound;
