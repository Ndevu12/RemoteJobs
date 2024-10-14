import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Signup from "../../components/Auth/Signup/Signup";
import Login from "../../components/Auth/Login/Login";
import { FiX } from "react-icons/fi";

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
    <div className="flex justify-center items-center m-5">
      <div className="relative bg-white p-8 rounded w-full max-w-md">
        <button
          onClick={handleClose}
          className="absolute bg-red-100 top-2 right-2 text-red-500 rounded hover:text-red-700"
        >
          <FiX size={24} />
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