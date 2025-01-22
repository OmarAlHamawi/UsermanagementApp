import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/navbar.css";

const Navbar: React.FC = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const confirmLogout = () => {
    setShowConfirm(true);
  };

  const cancelLogout = () => {
    setShowConfirm(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/users">View All Users</Link>
        {/* <Link to="/users/get-by-id">Get User By ID</Link> */}
        {/* <Link to="/users/search">Search User</Link> */}
        {/* <Link to="/users/create">Create User</Link> */}
        {/* <Link to="/users/update">Update User</Link> */}
        {/* <Link to="/users/delete">Delete User</Link> */}
      </div>
      <button className="logout-button" onClick={confirmLogout}>
        Log Out
      </button>

      {showConfirm && (
        <div className="popup">
          <div className="popup-content">
            <p className="logouttxt">Are you sure you want to log out?</p>
            <div className="popup-actions">
              <button onClick={handleLogout} id="confirm-button">
                Yes
              </button>
              <button onClick={cancelLogout} className="cancel-button">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
