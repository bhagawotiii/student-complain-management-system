import React, { useState, useEffect } from 'react';
import './StudentDashboard.css';
import { FaUserCircle } from 'react-icons/fa';
import { NavLink, Routes, Route } from 'react-router-dom';
import DashboardHome from './DashboardHome';
import AccountSetting from './AccountSetting';
import ComplaintForm from '../components/ComplaintForm';
import ComplaintHistory from './ComplaintHistory';

const StudentDashboardPage = () => {
  const [username, setUsername] = useState('Student');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="user-section">
          <FaUserCircle className="user-avatar" size={70} />
          <div className="user-name">{username}</div>
        </div>
        <ul className="sidebar-links">
          <li>
            <NavLink to="/student/dashboard" className={({ isActive }) => isActive ? 'active-link' : ''}>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/student/account" className={({ isActive }) => isActive ? 'active-link' : ''}>Account Setting</NavLink>
          </li>
          <li>
            <NavLink to="/student/complaint" className={({ isActive }) => isActive ? 'active-link' : ''}>Lodge Complaint</NavLink>
          </li>
          <li>
            <NavLink to="/student/history" className={({ isActive }) => isActive ? 'active-link' : ''}>Complaint History</NavLink>
          </li>
        </ul>
        {/* Logout Button */}
        <button
          style={{
            background: 'none',
            border: 'none',
            color: '#bfc9d1',
            fontSize: '1.2rem',
            fontWeight: 500,
            width: '100%',
            textAlign: 'left',
            padding: '8px 0 8px 10px',
            borderRadius: '6px',
            cursor: 'pointer',
            margin: '20px 0 0 0',
            transition: 'color 0.2s, background 0.2s',
            display: 'block',
          }}
          onMouseOver={e => { e.target.style.color = '#fff'; e.target.style.background = 'rgba(255,255,255,0.05)'; }}
          onMouseOut={e => { e.target.style.color = '#bfc9d1'; e.target.style.background = 'none'; }}
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('userRole');
            localStorage.removeItem('username');
            window.location.href = '/login';
          }}
        >
          Logout
        </button>
      </aside>
      <main className="dashboard-main">
        <Routes>
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="account" element={<AccountSetting />} />
          <Route path="complaint" element={<>
            <h2 style={{marginBottom: '30px'}}>Register Complaint</h2>
            <ComplaintForm />
          </>} />
          <Route path="history" element={<ComplaintHistory />} />
          <Route path="*" element={<DashboardHome />} />
        </Routes>
      </main>
    </div>
  );
};

export default StudentDashboardPage;
