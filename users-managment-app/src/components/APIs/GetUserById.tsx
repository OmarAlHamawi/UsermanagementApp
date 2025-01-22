import React, { useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import "../../css/getUserByID.css";
import Navbar from "../Main/Navbar";

const GetUserById: React.FC = () => {
  const [id, setId] = useState("");
  const [user, setUser] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get(`/users/${id}`);
      setUser(response.data);
    } catch (error) {
      setUser(null);
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <div className="getUserById">
      <Navbar />
      <div className="getUserById-container">
        <h2>Get User By ID</h2>
        <div className="input-container">
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter User ID"
          />
          <button id="find" onClick={fetchUser}>
            Find User
          </button>
        </div>

        {user && (
          <div className="user-details">
            <h3>User Details</h3>
            <ul>
              <li>
                <strong>ID:</strong> {user.id}
              </li>
              <li>
                <strong>Name:</strong> {user.firstName} {user.lastName}
              </li>
              <li>
                <strong>Email:</strong> {user.email}
              </li>
              <li>
                <strong>Username:</strong> {user.username}
              </li>
              <li>
                <strong>Mobile:</strong> {user.mobile}
              </li>
              <li>
                <strong>Country:</strong> {user.country}
              </li>
              <li>
                <strong>Role:</strong> {user.role}
              </li>
            </ul>
          </div>
        )}

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <p>User not found.</p>
              <button onClick={closePopup}>Ok</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetUserById;
