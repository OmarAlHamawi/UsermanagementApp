import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import CountryList from "react-select-country-list";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../css/createUser.css";
import Navbar from "../Main/Navbar";

interface User {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  mobile: string;
  email: string;
  password: string;
  role: string;
  birthDate: string;
  country: string;
}

const CreateUpdateUser: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const isUpdate = state?.user ? true : false;
  const initialUserData: User = isUpdate
    ? {
        id: state?.user.id,
        firstName: state?.user.firstName,
        lastName: state?.user.lastName,
        username: state?.user.username,
        mobile: state?.user.mobile,
        email: state?.user.email,
        password: "",
        role: state?.user.role,
        birthDate: state?.user.birthDate,
        country: state?.user.country,
      }
    : {
        firstName: "",
        lastName: "",
        username: "",
        mobile: "",
        email: "",
        password: "",
        role: "",
        birthDate: "",
        country: "",
      };

  const [formData, setFormData] = useState<User>(initialUserData);
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

  const submitUser = async () => {
    try {
      if (isUpdate) {
        await axiosInstance.put(`/users/${formData.id}`, formData);
        setPopupMessage("User updated successfully!");
      } else {
        await axiosInstance.post("/users", formData);
        setPopupMessage("User created successfully!");
      }
    } catch (error) {
      setPopupMessage("Failed to save user. Please try again.");
    }
  };

  const closePopup = () => {
    setPopupMessage(null);
    navigate("/users"); // Navigate to users list page after closing the popup
  };

  return (
    <div className="createUser">
      <Navbar />
      <div className="createUserContainer">
        <h2>{isUpdate ? "Update User" : "Create User"}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitUser();
          }}
        >
          <div className="form-fields">
            <div className="form-row">
              <div className="form-field">
                <label>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label>Mobile:</label>
                <input
                  type="text"
                  name="mobile"
                  className="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {isUpdate ? (
                <div className="form-field">
                  <label>Password:</label>
                  <div className="password-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required={!isUpdate}
                    />
                    <span
                      className="toggle-password"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
              ) : (
                <span>&nbsp;</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>Role:</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="form-field">
                <label>Birth Date:</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row" id="lastRow">
              <div className="form-field">
                <label>Country:</label>
                <select
                  name="country"
                  className="roleSelector"
                  value={formData.country}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select your country
                  </option>
                  {countryOptions.map(
                    (country: { value: string; label: string }) => (
                      <option key={country.value} value={country.label}>
                        {country.label}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          </div>

          <button id="create" type="submit">
            {isUpdate ? "Update User" : "Create User"}
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

export default CreateUpdateUser;
