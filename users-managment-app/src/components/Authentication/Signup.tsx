import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CountryList from "react-select-country-list";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import authService from "./authService";
import "../../css/auth.css";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    mobile: "",
    email: "",
    username: "",
    password: "",
    country: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Success popup state
  const [showErrorPopup, setShowErrorPopup] = useState(false); // Error popup state
  const navigate = useNavigate();
  const countryOptions = CountryList().getData();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.register(formData);
      setShowSuccessPopup(true); // Show success popup
    } catch (error) {
      setShowErrorPopup(true); // Show error popup on failure
    }
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
    navigate("/login"); // Redirect to login after closing success popup
  };

  const closeErrorPopup = () => {
    setShowErrorPopup(false); // Close the error popup
  };

  return (
    <div id="signup-page" className="auth-page">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthDate">Birth Date:</label>
          <input
            id="birthDate"
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile:</label>
          <input
            id="mobile"
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="password-container">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
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

        <div className="form-group">
          <label>Country:</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select your country
            </option>
            {countryOptions.map((country: { value: string; label: string }) => (
              <option key={country.value} value={country.label}>
                {country.label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>

      {showSuccessPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Signup successful! Please login.</p>
            <button onClick={closeSuccessPopup}>Ok</button>
          </div>
        </div>
      )}

      {showErrorPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Signup failed. Please check your credentials.</p>
            <button onClick={closeErrorPopup}>Ok</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
