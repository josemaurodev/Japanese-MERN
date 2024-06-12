import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./style.css";

function YourAccount() {
  const [user, setUser] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('userID');
    axios
      .get(`http://localhost:3001/user?userID=${id}`)
      .then((result) => {
        if (result.data.status === "success") {
          setUser({ ...result.data.user, password: "", confirmPassword: "" });
        } else {
          setErrorMessage(result.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("An error occurred. Please try again.");
      });
  }, []);

  const handleInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.password !== user.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    const id = localStorage.getItem('userID');
    axios
      .put("http://localhost:3001/user", {userID: id, ...user})
      .then((result) => {
        if (result.data.status === "success") {
          setUser({ ...result.data.user, password: "", confirmPassword: "" });
          setErrorMessage("");
          localStorage.setItem('userName', result.data.user.name);
          navigate("/info");
        } else {
          setErrorMessage(result.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("An error occurred. Please try again.");
      });
  };

  const handleDelete = () => {
    const id = localStorage.getItem('userID');
    axios
      .delete(`http://localhost:3001/user?userID=${id}`)
      .then((result) => {
        if (result.data.status === "success") {
          localStorage.removeItem('userID');
          localStorage.removeItem('userName');
          navigate("/login");
        } else {
          setErrorMessage(result.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("An error occurred. Please try again.");
      });
  };

  return (
    <div className="yourAccount bg-dark text-black">
      <Header title="" />
      <h2>Your Account</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="YAForm">
          <label htmlFor="name"><strong>Name:</strong></label>
          <input
            className="ya-name form-control rounded-15"
            type="text"
            placeholder="Enter name"
            autoComplete="off"
            name="name"
            value={user.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="YAForm">
          <label htmlFor="email"><strong>Email:</strong></label>
          <input
            className="ya-name form-control rounded-15"
            type="email"
            placeholder="Enter email"
            autoComplete="off"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="YAForm">
          <label htmlFor="password"><strong>Password:</strong></label>
          <input
            className="ya-name form-control rounded-15"
            type="password"
            placeholder="Enter password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="YAForm">
          <label htmlFor="confirmPassword"><strong>Confirm Password:</strong></label>
          <input
            className="ya-name form-control rounded-15"
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="button-ya btn btn-primary w-100 rounded-15">Update</button>
      </form>
      <button
        className="button-ya btn btn-danger w-100 rounded-15 mt-3"
        onClick={() => setDeleteConfirm(true)}
      >
        Delete Account
      </button>
      {deleteConfirm && (
        <div className="alert alert-danger delete-button">
          <p>Are you sure you want to delete your account? This action cannot be undone.</p>
          <button className="btn-yesDelete btn btn-danger" onClick={handleDelete}>Yes, Delete</button>
          <button className="btn btn-secondary" onClick={() => setDeleteConfirm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default YourAccount;
