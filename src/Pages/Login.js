import React, { useState } from "react";
import Axios from "axios"; // for making HTTP requests
import GoogleButton from "react-google-button";
import { useHistory } from "react-router-dom"; // Import for navigation in React Router v5

export default function Login() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerMobile, setRegisterMobile] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [adminCode, setAdminCode] = useState(""); // New field for admin access code

  const history = useHistory();

  // Register function
  const register = () => {
    Axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
        mobile: registerMobile,
        email: registerEmail,
      },
      headers: { "Content-Type": "application/json" }, // Set header
      withCredentials: true,
      url: "https://vv-backend-eud6.onrender.com/register",
    })
      .then((res) => {
        console.log(res);
        alert(res.data);
      })
      .catch((err) => {
        console.error("Registration Error:", err);
        alert("Registration failed! Please try again.");
      });
  };

  // Login function with admin check
  const login = () => {
    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
        adminCode: adminCode, // Send the admin code for validation
      },
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      url: "https://vv-backend-eud6.onrender.com/login",
    })
      .then((res) => {
        console.log(res);
        if (res.data.isAdmin) {
          alert("Admin login successful!");
          history.push("/editproduct"); // Redirect to EditProduct page if admin
        } else if (res.data.message === "User logged in") {
          alert("Login successful!");
          history.push("/profile"); // Redirect to user profile after login
        } else {
          alert(res.data.message); // Display any errors
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("Login failed. Please check your credentials.");
      });
  };

  // Google OAuth Authentication
  const googleAuth = () => {
    window.open(
      "https://vv-backend-eud6.onrender.com/google",
      "_self" // Open the redirect link in the same tab
    );
  };

  return (
    <div className="login">
      <div>
        <h1>Register Now!</h1>
        <input
          placeholder="Username"
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <br />
        <input
          placeholder="Mobile Number"
          onChange={(e) => setRegisterMobile(e.target.value)}
        />
        <br />
        <input
          placeholder="Email ID"
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <br />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <br />
        <button onClick={register}>Submit</button>
      </div>
      <br />
      <br />

      <div>
        <h1>Login</h1>
        <input
          placeholder="Username"
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <br />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <br />
        <input
          placeholder="Admin Code (if admin)"
          onChange={(e) => setAdminCode(e.target.value)}
        />
        <br />
        <button onClick={login}>Continue</button>
        <br />

        <center>
          <GoogleButton onClick={googleAuth} />
        </center>
      </div>
      <br />
      <br />
    </div>
  );
}
