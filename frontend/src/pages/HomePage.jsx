import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const role = localStorage.getItem('userRole');
  const username = localStorage.getItem('username');

  return (
    <div className="homepage-container">
      <div className="hero-box">
        <h1 className="hero-title">📣 Welcome, {username}!</h1>
        <p className="hero-subtitle">
          This is the Student Complaint Management System — submit your complaints quickly, track them easily,
          and experience transparent resolution.
        </p>

        <div className="hero-buttons">
          {role === 'student' && (
            <Link to="/student" className="hero-btn">
              Submit Complaint
            </Link>
          )}
          {role === 'admin' && (
            <Link to="/admin" className="hero-btn secondary">
              Admin Panel
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
