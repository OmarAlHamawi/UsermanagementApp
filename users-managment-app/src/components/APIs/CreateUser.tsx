import React, { useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import CountryList from "react-select-country-list";
import "../../css/createUser.css";
import Navbar from "../Main/Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const CreateUser: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    mobile: "",
    email: "",
    password: "",
    role: "",
    birthDate: "",
    country: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null); // State for popup message

  const countryOptions = CountryList().getData();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const createUser = async () => {
    try {
      await axiosInstance.post("/users", formData);
      setPopupMessage("User created successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        mobile: "",
        email: "",
        password: "",
        role: "",
        birthDate: "",
        country: "",
      });
    } catch (error) {
      setPopupMessage("Failed to create user.");
    }
  };

  const closePopup = () => {
    setPopupMessage(null);
  };

  return (
    <div className="createUser">
      <Navbar />
      <div className="createUserContainer">
        <h2>Create User</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createUser();
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
              <div className="form-field">
                <label>Password:</label>
                <div className="password-container">
                  <input
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
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Role:</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                />
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
            Create
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

export default CreateUser;
