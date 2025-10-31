import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedUser) {
      navigate("/login");
    } else {
      setUser(loggedUser);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === user.email ? user : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert("Profile updated!");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="container d-flex justify-content-center">
      <div className="col-md-6 auth-container">
        <h3 className="text-center mb-4">My Account</h3>
        <div className="mb-3">
          <label>Name</label>
          <input
            name="name"
            className="form-control"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Email (read only)</label>
          <input
            name="email"
            className="form-control"
            value={user.email}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSave} className="btn auth-btn w-100 mb-2">
          Save Changes
        </button>
        <button onClick={handleLogout} className="btn btn-danger w-100">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Account;
