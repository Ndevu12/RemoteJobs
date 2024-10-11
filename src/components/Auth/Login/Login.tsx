import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../Buttons/Button";
import { generateToken } from "../../../utils/tokenUtils";
import { useAuth } from "../../../context/AuthContext";

interface FormData {
  email: string;
  password: string;
}

const API_BASE_URL = (import.meta as any).env.VITE_REACT_APP_API_BASE_URL;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login, setHasAccount } = useAuth();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loginFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const { token, refreshToken } = await response.json();
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        toast.success("Login successful! Welcome!");
        login(); // Update AuthContext state
        setHasAccount(true); // Ensure hasAccount is set to true
        setLoading(false);
        navigate('/');
      } else if (response.status === 401) {
        toast.error("Invalid Credentials.");
        setLoading(false);
      } else {
        throw new Error("Server error");
      }
    } catch (error) {
      const existingUsers = localStorage.getItem('signupData');
      let users = existingUsers ? JSON.parse(existingUsers) : [];

      // Ensure users is an array
      if (!Array.isArray(users)) {
        users = [];
      }

      const user = users.find((user: any) => user.email === formData.email && user.password === formData.password);
      if (user) {
        const token = generateToken({ email: user.email });
        localStorage.setItem("token", token);
        toast.success("Login successful using local data! Welcome!");
        login(); // Update AuthContext state
        setHasAccount(true); // Ensure hasAccount is set to true
        navigate('/');
      } else {
        toast.error("Invalid Credentials or Server is not responding.");
      }
      setLoading(false);
    }
  };

  const handleSignUpClick = () => {
    navigate('/auth?type=signup');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer />
      <form onSubmit={loginFormHandler} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="example@gmail.com"
            id="email"
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Your password"
            id="password"
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4 text-center">
          <p className="text-gray-600">
            Don&apos;t have an account?
            <span className="text-blue-500 cursor-pointer ml-1" onClick={handleSignUpClick}>
              Sign up
            </span>
          </p>
        </div>
        <Button className="w-full" text="Login" loading={loading} />
      </form>
    </div>
  );
};

export default Login;