import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import CountryList from "react-select-country-list";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../css/updateUser.css";
import Navbar from "../Main/Navbar";

const UpdateUser: React.FC = () => {
  const { state } = useLocation();
  const { user } = state;

  const [formData, setFormData] = useState({
    id: user.id || "",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    username: user.username || "",
    mobile: user.mobile || "",
    email: user.email || "",
    password: "",
    role: user.role || "",
    birthDate: user.birthDate || "",
    country: user.country || "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const countryOptions = useMemo(() => CountryList().getData(), []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const updateUser = async () => {
    try {
      await axiosInstance.put(`/users/${formData.id}`, formData);
      setPopupMessage("User updated successfully!");
    } catch (error) {
      setPopupMessage(
        "Failed to update user. Please check the details and try again."
      );
    }
  };

  const closePopup = () => {
    setPopupMessage(null);
  };

  return (
    <div className="update-user-page">
      <Navbar />
      <div className="form-container">
        <h2>Update User</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateUser();
          }}
        >
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Mobile:</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group password-container">
            <label>Password:</label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <span onClick={togglePasswordVisibility} className="eye-icon">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="form-group">
            <label>Role:</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Birth Date:</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Country:</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">Select a country</option>
              {countryOptions.map(
                (country: { value: string; label: string }) => (
                  <option key={country.value} value={country.label}>
                    {country.label}
                  </option>
                )
              )}
            </select>
          </div>
          <button id="update" type="submit">
            Update User
          </button>
        </form>
      </div>

      {popupMessage && (
        <div className="popup">
          <div className="popup-content">
            <p>{popupMessage}</p>
            <button onClick={closePopup}>Ok</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
