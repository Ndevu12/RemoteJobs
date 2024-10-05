import React, { useState } from "react";

import Button from "../../Buttons/Button";

import "../../../styles/Login.css";
import Notification from "../../Notification/Notification";

interface propsType {
  signUpFormActive: () => void;
  removeAuth: () => void;
}

interface FormData {
  email: string;
  password: string;
}

const API_BASE_URL = (import.meta as any).env.VITE_REACT_APP_API_BASE_URL;

const Login = (props: propsType) => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const [isCompany, setIsCompany] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const signUpFormLink = () => {
    props.signUpFormActive();
  };

  const loginFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    let response;

    try {
      if (isCompany) {
        response = await fetch(`${API_BASE_URL}/api/auth/company/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        localStorage.setItem("accountType", "company");
      } else {
        response = await fetch(`${API_BASE_URL}/auth/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        localStorage.setItem("accountType", "user");
      }

      if (response.ok) {
        const { token, refreshToken } = await response.json();
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        setNotification("Login successful! Welcome!");
        props.removeAuth();
        setLoading(false);
      } else if (response.status === 401) {
        setNotification("Invalid Credentials.");
        setLoading(false);
      } else {
        throw new Error("");
      }
      setTimeout(() => {
        setNotification("");
      }, 3000);
    } catch (error) {
      setNotification("Something went wrong, Try again!");
      setTimeout(() => {
        setNotification("");
      }, 3000);
      setLoading(false);
    }
  };

  return (
    <form action="" onSubmit={loginFormHandler} className="form">
      {isCompany && <div className="badge">Company</div>}
      {notification.length ? <Notification text={notification} /> : ""}
      <h2>Login</h2>
      <label htmlFor="email">
        <span>Email</span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="example@gmail.com"
          id="email"
        />
      </label>
      <label htmlFor="password">
        <span>Password</span>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Your password"
          id="password"
          required
        />
      </label>
      <div className="sub--form-action">
        <p className="sign-as">
          {isCompany
            ? "For non-company users sign in "
            : "Sign in as a company "}
          <span
            className="login--signup-here"
            onClick={() => {
              setIsCompany(!isCompany);
            }}
          >
            here
          </span>
        </p>
        <p>
          Don&apos;t have account
          <span className="login--signup-here" onClick={signUpFormLink}>
            {" "}
            Sign up
          </span>
        </p>
      </div>
      <Button className="" text="Login" loading={loading} />
    </form>
  );
};
export default Login;


