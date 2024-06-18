import React from "react";
import { Link } from "react-router-dom";
import { PersonFill } from 'react-bootstrap-icons';
import { useNavigate } from "react-router-dom";

function Header(props) {
  const userName = localStorage.getItem('userName');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userID");
    localStorage.removeItem("userName");
    navigate("/login");
  }
  
  return (
    <header className="header-padding mb-1">
      <div className="button-container">
        <div className="dropdown">
          <button
            className="btn btn-dark btn-custom dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Learn Hiragana
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <Link to="/Hiragana" className="dropdown-item">
                Complete Hiragana
              </Link>
            </li>
            <li>
              <Link to="/HiraganaVowels" className="dropdown-item">
                Vowels
              </Link>
            </li>
            <li>
              <Link to="/HiraganaDakuten" className="dropdown-item">
                Dakuten
              </Link>
            </li>
            <li>
              <Link to="/HiraganaHandakuten" className="dropdown-item">
                Handakuten
              </Link>
            </li>
          </ul>
        </div>
        <div className="dropdown">
          <button
            className="btn btn-dark btn-custom dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Learn Katakana
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <Link to="/Katakana" className="dropdown-item">
                Complete Katakana
              </Link>
            </li>
            <li>
              <Link to="/KatakanaVowels" className="dropdown-item">
                Vowels
              </Link>
            </li>
            <li>
              <Link to="/KatakanaDakuten" className="dropdown-item">
                Dakuten
              </Link>
            </li>
            <li>
              <Link to="/KatakanaHandakuten" className="dropdown-item">
                Handakuten
              </Link>
            </li>
          </ul>
        </div>
        <Link
          to="/hiraganaQuiz"
          className="btn btn-dark btn-custom text-decoration-none text-light"
        >
          Hiragana Quiz
        </Link>
        <Link
          to="/katakanaQuiz"
          className="btn btn-dark btn-custom text-decoration-none text-light"
        >
          Katakana Quiz
        </Link>
        <Link
          to="/info"
          className="btn btn-dark btn-custom text-decoration-none text-light"
        >
          Info
        </Link>
        <Link
          to="/schedule"
          className="btn btn-dark btn-custom text-decoration-none text-light"
        >
          Schedule
        </Link>

        {/* Start Account Button */}
        <div className="dropdown" aria-labelledby="userDropdown">
          <button
            className="btn btn-dark btn-custom dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {userName || "Guest"}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <Link to="/YourAccount" className="dropdown-item">
                Your Account
              </Link>
            </li>
            <li>
              <Link to="/login" className="dropdown-item" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <h1 className="display-6 fw-bold text-uppercase">{props.title}</h1>
    </header>
  );
}

export default Header;
