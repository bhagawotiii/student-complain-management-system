import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-logo">SCMS</div>
    <ul className="navbar-links">
      <li><Link to="/home">Home</Link></li>
      <li><Link to="/student">Student</Link></li>
      <li><Link to="/admin">Admin</Link></li>
      <li>
        <button
          onClick={() => {
            localStorage.removeItem('userRole');
            window.location.href = '/';
          }}
          className="logout-button"
        >
          Logout
        </button>
      </li>
    </ul>
  </nav>
);

export default Navbar;
