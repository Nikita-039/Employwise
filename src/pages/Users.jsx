
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ first_name: "", last_name: "", email: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      fetchUsers();
    }
  }, [page]);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, users]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      setError("Failed to fetch users. Please try again later.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      setError("Error deleting user. Please try again.");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setFormData({ first_name: user.first_name, last_name: user.last_name, email: user.email });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.first_name || !formData.last_name || !formData.email) {
      setError("All fields are required.");
      return;
    }
    try {
      await axios.put(`https://reqres.in/api/users/${editingUser}`, formData);
      setUsers(users.map((user) => (user.id === editingUser ? { ...user, ...formData } : user)));
      setEditingUser(null);
      setError("");
    } catch (error) {
      setError("Error updating user. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>User List</h2>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="row">
        {filteredUsers.map((user) => (
          <div key={user.id} className="col-md-4 mb-3">
            <div className="card p-3 text-center">
              <img src={user.avatar} alt={user.first_name} className="rounded-circle mb-2" width="80" />
              {editingUser === user.id ? (
                <form onSubmit={handleUpdate}>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    required
                  />
                  <input
                    type="email"
                    className="form-control mb-2"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <button type="submit" className="btn btn-success btn-sm me-2">Save</button>
                  <button className="btn btn-secondary btn-sm" onClick={() => setEditingUser(null)}>Cancel</button>
                </form>
              ) : (
                <>
                  <h5>{user.first_name} {user.last_name}</h5>
                  <p>{user.email}</p>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(user)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>Delete</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-primary me-2"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Users;

