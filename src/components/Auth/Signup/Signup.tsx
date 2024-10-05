/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import Button from "../../Buttons/Button";
import Notification from "../../Notification/Notification";

import "../../../styles/Login.css";
import "../../../styles/Signup.css";

const API_BASE_URL = (import.meta as any).env.VITE_REACT_APP_API_BASE_URL;

interface propsType {
  signInFormActive: () => void;
}

const Signup = (props: propsType) => {
  const [loading, setLoading] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [notification, setNotification] = useState("");

  const signInFormLink = () => {
    props.signInFormActive();
  };

  const signupFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    let response;
    const formData = new FormData(event.target as HTMLFormElement);

    if (isCompany) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const Data = {
        name: formData.get("name"),
        email: formData.get("email"),
        website: formData.get("website"),
        logo: formData.get("logo"),
        logoBackground: formData.get("logoBackground"),
        password: formData.get("password"),
      };

      response = await fetch(`${API_BASE_URL}/api/auth/company`, {
        method: "POST",
        body: formData,
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const Data = {
        name: formData.get("name"),
        email: formData.get("email"),
        occupation: formData.get("occupation"),
        password: formData.get("password"),
      };

      response = await fetch(`${API_BASE_URL}/api/auth/user`, {
        method: "POST",
        body: formData,
      });
    }

    if (response.ok) {
      setNotification("Success! 🚀 Registration successful.");
      // const result = await response.json();
      setTimeout(() => {
        setNotification("");
      }, 2000);
      setTimeout(() => {
        setNotification("Login with same credentials, to continue");
      }, 2500);
      setTimeout(() => {
        signInFormLink();
      }, 5000);
      setLoading(false);
    } else if (response.status === 409) {
      setNotification("User already exist");
      setTimeout(() => {
        setNotification("");
      }, 3000);
      setLoading(false);
    } else {
      setNotification("Please Enter valid inputs.");
      setTimeout(() => {
        setNotification("");
      }, 3000);
      setLoading(false);
    }
  };

  return (
    <form action="" onSubmit={signupFormHandler} className="form signup-form">
      {isCompany && <div className="badge">Company</div>}
      {notification.length ? <Notification text={notification} /> : ""}
      <h2>Signup</h2>
      <label htmlFor="name">
        <span>Name*</span>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          id="name"
          required
        />
      </label>
      <label htmlFor="email">
        <span>Email*</span>
        <input
          type="email"
          name="email"
          placeholder="example@gmail.com"
          id="email"
          required
        />
      </label>
      {!isCompany && (
        <label htmlFor="occupation">
          <span>Occupation*</span>
          <input
            type="text"
            placeholder="Doctor, Software Engineer.."
            name="occupation"
            id="occupation"
            required
          />
        </label>
      )}
      {isCompany && (
        <label htmlFor="website">
          <span>Website*</span>
          <input
            type="text"
            name="website"
            placeholder="www.example.com"
            id="website"
            required
          />
        </label>
      )}
      {isCompany && (
        <label htmlFor="logo">
          <span>Logo* (svg, png, jpg, jpeg)</span>
          <input type="file" name="logo" id="logo" required />
        </label>
      )}
      {isCompany && (
        <label htmlFor="logobg">
          <span>Logo background color*</span>
          <input
            type="color"
            name="logoBackground"
            id="logoBackground"
            required
          />
        </label>
      )}
      <label htmlFor="password">
        <span>Password*</span>
        <input
          type="password"
          name="password"
          placeholder="Your password"
          id="password"
          required
        />
      </label>
      <div className="sub--form-action">
        <p className="sign-as">
          {isCompany
            ? "For non-company users sign up "
            : "Sign up as a company "}
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
          Already have account
          <span className="login--signup-here" onClick={signInFormLink}>
            {" "}
            login
          </span>
        </p>
      </div>
      <Button className="" text="SignUp" loading={loading} />
    </form>
  );
};
export default Signup;
