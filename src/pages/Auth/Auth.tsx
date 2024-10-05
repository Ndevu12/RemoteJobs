import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Signup from "../../components/Auth/Signup/Signup";
import Login from "../../components/Auth/Login/Login";

const Auth: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignUpActive, setIsSignUpActive] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get("type");
    setIsSignUpActive(type === "signup");
  }, [location.search]);

  const toggleForm = () => {
    setIsSignUpActive(!isSignUpActive);
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center m-5 bg-gray-100">
      <div className="relative bg-white p-8 rounded w-full max-w-md">
        <button
          onClick={handleClose}
          className="absolute w-10 top-2 mt-1 font-semibold right-2 text-gray-700 hover:text-blue-700"
          style={{ lineHeight: 0 }} 
        >
          &times;
        </button>
        {isSignUpActive ? (
          <Signup signInFormActive={toggleForm} />
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
};

export default Auth;