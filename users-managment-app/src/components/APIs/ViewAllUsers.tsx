import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import { FaPen } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import "../../css/viewAllUsers.css";
import Navbar from "../Main/Navbar";

const ViewAllUsers: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [countries, setCountries] = useState<any[]>([]);

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const role = selectedRole ? selectedRole.value : "";
      const country = selectedCountry ? selectedCountry.value : "";
      const response = await axiosInstance.get(`/users/searchAndFilter`, {
        params: {
          term: searchTerm.trim() || null,
          role: role || null,
          country: country || null,
          page,
          size,
        },
      });
      setUsers(response.data.content);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);
    } catch (error) {
      setUsers([]);
      //setPopupMessage("Failed to fetch users.");
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axiosInstance.get(`/users/countries`);
      setCountries(response.data);
    } catch (error) {
      setPopupMessage("Failed to fetch countries.");
    }
  };

  const confirmDeleteUser = (userId: string) => {
    setDeleteUserId(userId);
  };

  const handleDeleteUser = async () => {
    if (!deleteUserId) return;

    try {
      await axiosInstance.delete(`/users/${deleteUserId}`);
      setPopupMessage("User deleted successfully!");
      fetchUsers();
    } catch (error) {
      setPopupMessage("Failed to delete user.");
    } finally {
      setDeleteUserId(null);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers();
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(Number(e.target.value));
    setPage(0); // Reset to the first page when the size changes
  };

  useEffect(() => {
    fetchUsers();
    fetchCountries();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [page, size, searchTerm, selectedCountry, selectedRole]);

  return (
    <div className="viewAllUsers">
      <Navbar />
      <div className="viewAllUsers-container">
        <h2>All Users</h2>
        <div className="searchAndfilter">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {/* <button type="submit" className="search-button">
              Search
            </button> */}
          </form>
          <div className="filter-dropdowns">
            <select
              className="userRoleDropdown"
              value={selectedRole?.value || ""}
              onChange={(e) =>
                setSelectedRole({
                  value: e.target.value,
                  label: e.target.options[e.target.selectedIndex].text,
                })
              }
            >
              <option value="">All Roles</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <select
              className="userCountryDropdown"
              value={selectedCountry?.value || ""}
              onChange={(e) =>
                setSelectedCountry({
                  value: e.target.value,
                  label: e.target.options[e.target.selectedIndex].text,
                })
              }
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="adduser">
            <button onClick={() => navigate("/user/form")}>
              <span>
                <IoPersonAddSharp />
              </span>
            </button>
          </div>
        </div>
        <table className="viewAllUsers-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Mobile</th>
              <th>Birth Date</th>
              <th>Role</th>
              <th>Country</th>
              <th>Update</th>
              <th>Delete</th>
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
                <td>{user.birthDate}</td>
                <td>{user.role}</td>
                <td>{user.country}</td>
                <td>
                  <button
                    className="tableButton"
                    id="Editbutton"
                    onClick={() => navigate("/user/form", { state: { user } })}
                  >
                    <span>{<FaPen />}</span>
                  </button>
                </td>
                <td>
                  <button
                    id="deletebutton"
                    className="tableButton"
                    onClick={() => confirmDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination-controls">
          <button
            onClick={handlePreviousPage}
            disabled={page === 0}
            className="pagination-button"
          >
            Previous
          </button>
          <span>
            Page {page + 1} of {totalPages} (Showing {users.length} of{" "}
            {totalElements} elements)
          </span>
          <button
            onClick={handleNextPage}
            disabled={page >= totalPages - 1}
            className="pagination-button"
          >
            Next
          </button>
          <div>
            <label htmlFor="sizeSelector">Elements per page:</label>
            <select
              id="sizeSelector"
              value={size}
              onChange={handleSizeChange}
              className="size-dropdown"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>

      {popupMessage && (
        <div className="popup">
          <div className="popup-content">
            <p>{popupMessage}</p>
            <button onClick={() => setPopupMessage(null)}>Close</button>
          </div>
        </div>
      )}

      {deleteUserId && (
        <div className="popup">
          <div className="popup-content" id="deletepopup">
            <p>Are you sure you want to delete this user?</p>
            <button id="deleteYes" onClick={handleDeleteUser}>
              Yes
            </button>
            <button className="deleteNo" onClick={() => setDeleteUserId(null)}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllUsers;
