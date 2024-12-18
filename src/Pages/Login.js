import React, { useState } from "react";
import Axios from "axios"; // For making HTTP requests
import GoogleButton from "react-google-button"; // Google login button
import { useHistory } from "react-router-dom"; // Navigation in React Router v5

export default function Login() {
  // State for registration fields
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerMobile, setRegisterMobile] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");

  // State for login fields
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [adminCode, setAdminCode] = useState(""); // New field for admin access code

  const history = useHistory(); // For redirection

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
      withCredentials: true,
      url: "https://vv-backend-eud6.onrender.com/register", // Backend API endpoint
    })
      .then((res) => {
        console.log(res);
        alert(res.data); // Display success or error message
      })
      .catch((error) => {
        console.error("Registration error:", error);
        alert("Registration failed. Please try again.");
      });
  };

  // Login function with admin check
  const login = () => {
    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
        adminCode: adminCode, // Admin access code
      },
      withCredentials: true,
      url: "https://vv-backend-eud6.onrender.com/login", // Backend API endpoint
    })
      .then((res) => {
        console.log(res);
        if (res.data.isAdmin) {
          alert("Admin login successful!");
          history.push("/editproduct"); // Redirect to Admin page
        } else if (res.data.message === "User logged in") {
          alert("Login successful!");
          history.push("/home"); // Redirect to user home page
        } else {
          alert(res.data.message); // Display any other message
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("Login failed. Please check your credentials.");
      });
  };

  // Google OAuth function
  const googleAuth = () => {
    window.open("https://vv-backend-eud6.onrender.com/google", "_self");
  };

  return (
    <div className="login">
      {/* Registration Form */}
      <div>
        <h1>Register Now!</h1>
        <input
          placeholder="Username"
          value={registerUsername}
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <br />
        <input
          placeholder="Mobile Number"
          value={registerMobile}
          onChange={(e) => setRegisterMobile(e.target.value)}
        />
        <br />
        <input
          placeholder="Email ID"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <br />
        <input
          placeholder="Password"
          type="password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <br />
        <button onClick={register}>Submit</button>
      </div>

      <br /><br />

      {/* Login Form */}
      <div>
        <h1>Login</h1>
        <input
          placeholder="Username"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <br />
        <input
          placeholder="Password"
          type="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <br />
        <input
          placeholder="Admin Code (if admin)"
          value={adminCode}
          onChange={(e) => setAdminCode(e.target.value)}
        />
        <br />
        <button onClick={login}>Continue</button>
        <br />

        <center>
          <GoogleButton onClick={googleAuth} />
        </center>
      </div>
    </div>
  );
}
