import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function YourAccount() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('userID');
    axios
      .get(`http://localhost:3001/user?userID=${id}`)
      .then((result) => {
        if (result.data.status === "success") {
          setUser(result.data.user);
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
    const id = localStorage.getItem('userID');
    event.preventDefault();
    axios
      .put("http://localhost:3001/user", {userID: id, ...user})
      .then((result) => {
        if (result.data.status === "success") {
          
          setUser(result.data.user);
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

  return (
    <div>
      <h2>Your Account</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name">
            <strong>Name</strong>
          </label>
          <input
            type="text"
            placeholder="Enter name"
            autoComplete="off"
            name="name"
            className="form-control rounded-0"
            value={user.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <input
            type="email"
            placeholder="Enter email"
            autoComplete="off"
            name="email"
            className="form-control rounded-0"
            value={user.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">
            <strong>Password</strong>
          </label>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            className="form-control rounded-0"
            value={user.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 rounded-0">
          Update
        </button>
      </form>
    </div>
  );
}

export default YourAccount;
