import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-logo">SCMS</div>
    <ul className="navbar-links">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/student">Student</Link></li>
      <li><Link to="/admin">Admin</Link></li>
      <li>
  <a href="#" onClick={() => {
    localStorage.removeItem('userRole');
    window.location.href = '/';
  }}>Logout</a>
</li>

    </ul>
  </nav>
);

export default Navbar;
