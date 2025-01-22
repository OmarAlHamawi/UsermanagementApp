import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import authService from "./authService";
import "../../css/auth.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for the popup
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authService.login({ username, password });
      localStorage.setItem("token", response.token);
      navigate("/");
    } catch (error) {
      setShowPopup(true); // Show the popup on error
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <div id="login-page" className="auth-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="password-container">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign up here</a>
      </p>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Login failed. Please check your credentials.</p>
            <button onClick={closePopup}>Ok</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
