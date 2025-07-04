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
