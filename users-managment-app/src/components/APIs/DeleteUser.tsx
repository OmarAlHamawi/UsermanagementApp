import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/axiosInstance";
import "../../css/deleteUser.css";
import Navbar from "../Main/Navbar";

const DeleteUser: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteByIdModal, setShowDeleteByIdModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const [userIdToDelete, setUserIdToDelete] = useState<string>("");
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(
        `/users?page=${page}&size=${size}`
      );
      setUsers(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setPopupMessage("Failed to fetch users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, size]);

  const handleDeleteUser = async (userId: string) => {
    try {
      await axiosInstance.delete(`/users/${userId}`);
      closeModals();
      setTimeout(() => setPopupMessage("User deleted successfully!"), 300); // Wait for modal to close
      fetchUsers();
    } catch (error) {
      closeModals();
      setTimeout(() => setPopupMessage("Failed to delete user."), 300); // Wait for modal to close
    }
  };

  const closeModals = () => {
    setShowModal(false);
    setShowDeleteByIdModal(false);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleDeleteById = () => {
    if (!userIdToDelete) {
      setPopupMessage("Please enter a valid user ID.");
      return;
    }
    setShowDeleteByIdModal(true);
  };

  return (
    <div className="deleteUser">
      <Navbar />
      <div className="deleteUserContainer">
        <h2>Delete User</h2>

        <div className="deleteUserInput">
          <input
            type="text"
            placeholder="Enter User ID to delete"
            value={userIdToDelete}
            onChange={(e) => setUserIdToDelete(e.target.value)}
          />
          <button className="deletebuttonMain" onClick={handleDeleteById}>
            Delete by ID
          </button>
        </div>

        <table className="deleteUser-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>
                  <button
                    className="deleteButton"
                    onClick={() => {
                      setUserToDelete(user);
                      setShowModal(true);
                    }}
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
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page >= totalPages - 1}
            className="pagination-button"
          >
            Next
          </button>
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

      {showDeleteByIdModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>
              Are you sure you want to delete the user with ID: {userIdToDelete}
              ?
            </h3>
            <div className="modal-buttons">
              <button onClick={() => handleDeleteUser(userIdToDelete)}>
                Yes
              </button>
              <button onClick={() => closeModals()}>No</button>
            </div>
          </div>
        </div>
      )}

      {showModal && userToDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Are you sure you want to delete this user?</h3>
            <p>
              User: {userToDelete.firstName} {userToDelete.lastName}
            </p>
            <div className="modal-buttons">
              <button onClick={() => handleDeleteUser(userToDelete.id)}>
                Yes
              </button>
              <button onClick={() => closeModals()}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteUser;
