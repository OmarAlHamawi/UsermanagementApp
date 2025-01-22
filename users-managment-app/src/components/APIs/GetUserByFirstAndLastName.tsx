import React, { useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import Navbar from "../Main/Navbar";
import "../../css/getUserByFirstAndLastName.css";

const GetUserByFirstAndLastName: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<"firstName" | "lastName">(
    "firstName"
  );
  const [users, setUsers] = useState<any[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  const fetchUsers = async () => {
    try {
      const endpoint =
        searchType === "firstName"
          ? `/users/firstname/${searchTerm}`
          : `/users/lastname/${searchTerm}`;
      const response = await axiosInstance.get(endpoint);
      console.log("Response:", response.data);
      setUsers(response.data.content);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="getUserByFirstAndLastName-page">
      <Navbar />
      <div className="getUserByFirstAndLastName-container">
        <h2 className="getUserByFirstAndLastName-title">
          Search User By First Name or Last Name
        </h2>

        <div className="input-container">
          <div className="toggle-container">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={searchType === "lastName"}
                onChange={() =>
                  setSearchType(
                    searchType === "firstName" ? "lastName" : "firstName"
                  )
                }
              />
              <span className="slider"></span>
            </label>
            <span className="toggle-label">
              {searchType === "firstName" ? "First Name" : "Last Name"}
            </span>
          </div>
          <div className="search-input-container">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Enter ${
                searchType === "firstName" ? "First" : "Last"
              } Name`}
              className="search-input"
            />
            <button onClick={fetchUsers} className="search-button">
              Search
            </button>
          </div>
        </div>

        {users.length > 0 && (
          <div className="user-table-container">
            <h3 className="user-table-title">User Details</h3>
            <table className="user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Mobile</th>
                  <th>Country</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.username}</td>
                    <td>{user.mobile}</td>
                    <td>{user.country}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <p className="popup-message">No users found.</p>
              <button onClick={closePopup} className="popup-button">
                Ok
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetUserByFirstAndLastName;
