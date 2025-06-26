import React from 'react';
import './Admin.css';
import { FaUsers, FaExclamationCircle, FaCheckCircle, FaClipboardList } from 'react-icons/fa';

const AdminPage = () => {
  const stats = [
    { title: 'Total Complaints', count: 0, icon: <FaClipboardList />, color: '#6a11cb' },
    { title: 'Pending Complaints', count: 0, icon: <FaExclamationCircle />, color: '#ff6b6b' },
    { title: 'Resolved Complaints', count: 0, icon: <FaCheckCircle />, color: '#38b000' },
    { title: 'Total Students', count: 0, icon: <FaUsers />, color: '#00bcd4' },
  ];

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Admin</h2>
        <ul>
          <li>Dashboard</li>
          <li>View Complaints</li>
          <li>Manage Users</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <h1>Admin Dashboard</h1>
        <div className="card-grid">
          {stats.map((stat, index) => (
            <div className="card" key={index} style={{ borderLeft: `4px solid ${stat.color}` }}>
              <div className="card-icon">{stat.icon}</div>
              <div className="card-content">
                <p className="card-title">{stat.title}</p>
                <p className="card-count">{stat.count}</p>
                <a href="#">View →</a>
              </div>
            </div>
          ))}
        </div>

        {/* Optional: recent complaints preview */}
        <div className="recent-table">
          <h2>Recent Complaints</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Subject</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#001</td>
                <td>Ram</td>
                <td>WiFi Not Working</td>
                <td><span className="status pending">Pending</span></td>
              </tr>
              <tr>
                <td>#002</td>
                <td>Sita</td>
                <td>Food Quality</td>
                <td><span className="status resolved">Resolved</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
