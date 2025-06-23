import React from 'react';
import './StudentDashboard.css';
import ComplaintForm from '../components/ComplaintForm';
import { FaUsers, FaFolder, FaFileAlt, FaUserShield } from 'react-icons/fa';

const StudentDashboardPage = () => {
  const stats = [
    { title: ' My Total Complaint', count: 2, icon: <FaUserShield />, color: '#6a11cb' },
    { title: 'Pending Complaint', count: 7, icon: <FaUsers />, color: '#11998e' },
    { title: 'Resolve Complaint', count: 5, icon: <FaFolder />, color: '#0f2027' },
    
  ];

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Student</h2>
        <ul>
          <li>Dashboard</li>
          <li>My Complaints</li>
          <li>Resolved</li>
          <li>Profile</li>
          <li>Logout</li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <h1>Dashboard</h1>

        <div className="card-grid">
          {stats.map((stat, index) => (
            <div className="card" key={index} style={{ borderLeft: `4px solid ${stat.color}` }}>
              <div className="card-icon">{stat.icon}</div>
              <div className="card-content">
                <p className="card-title">{stat.title.toUpperCase()}</p>
                <p className="card-count">{stat.count}</p>
                <a href="#">View →</a>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Complaint Form Section */}
        <div className="complaint-form-section">
          <h2>Submit a Complaint</h2>
          <ComplaintForm />
        </div>
      </main>
    </div>
  );
};

export default StudentDashboardPage;
