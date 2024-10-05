import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../Buttons/Button";

const API_BASE_URL = (import.meta as any).env.VITE_REACT_APP_API_BASE_URL;

interface Props {
  signInFormActive: () => void;
}

const Signup: React.FC<Props> = ({ signInFormActive }) => {
  const [loading, setLoading] = useState(false);

  const signInFormLink = () => {
    signInFormActive();
  };

  const signupFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      occupation: formData.get("occupation"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Success! 🚀 Registration successful.");
        localStorage.setItem('hasAccount', 'true');
        setTimeout(() => {
          signInFormLink();
        }, 2000);
      } else if (response.status === 409) {
        toast.error("User already exists.");
      } else if (response.status === 400) {
        toast.error("Please enter valid inputs.");
      } else {
        throw new Error("Server error");
      }
    } catch (error) {
      // Check if users already exist in localStorage
      const existingUsers = localStorage.getItem('signupData');
      let users = existingUsers ? JSON.parse(existingUsers) : [];

      // Ensure users is an array
      if (!Array.isArray(users)) {
        users = [];
      }

      // Check if the email already exists in the local storage
      const userExists = users.some((user: any) => user.email === data.email);
      if (userExists) {
        toast.error("User already exists in local storage.");
      } else {
        // Add the new user to the array and save it back to localStorage
        users.push(data);
        localStorage.setItem('signupData', JSON.stringify(users));
        toast.error("Server is not responding. Your data has been saved locally.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer />
      <form onSubmit={signupFormHandler} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name*
          </label>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            id="name"
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email*
          </label>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            id="email"
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="occupation" className="block text-gray-700">
            Occupation*
          </label>
          <input
            type="text"
            placeholder="Doctor, Software Engineer.."
            name="occupation"
            id="occupation"
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">
            Password*
          </label>
          <input
            type="password"
            name="password"
            placeholder="Your password"
            id="password"
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4 text-center">
          <p className="text-gray-600">
            Already have an account?
            <span className="text-blue-500 cursor-pointer ml-1" onClick={signInFormLink}>
              Login
            </span>
          </p>
        </div>
        <Button className="w-full" text="Sign Up" loading={loading} />
      </form>
    </div>
  );
};

export default Signup;