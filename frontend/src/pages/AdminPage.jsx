import React, { useEffect, useState } from 'react';
import './Admin.css';
import { FaUsers, FaExclamationCircle, FaCheckCircle, FaClipboardList, FaTrash, FaUser, FaClock, FaCheck, FaTimes } from 'react-icons/fa';

const statusColors = {
  Pending: '#f39c12',
  Resolved: '#27ae60',
  Rejected: '#e74c3c',
};

const AdminPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/complaints', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch complaints');
      setComplaints(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch complaints');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/complaints/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      fetchComplaints();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const deleteComplaint = async (id) => {
    if (!window.confirm('Are you sure you want to delete this complaint?')) return;
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/complaints/${id}/admin`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchComplaints();
    } catch (err) {
      alert('Failed to delete complaint');
    }
  };

  // Stats
  const total = complaints.length;
  const pending = complaints.filter(c => c.status === 'Pending').length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;
  const rejected = complaints.filter(c => c.status === 'Rejected').length;

  const stats = [
    { title: 'Total Complaints', count: total, icon: <FaClipboardList />, color: '#6a11cb' },
    { title: 'Pending', count: pending, icon: <FaClock />, color: '#f39c12' },
    { title: 'Resolved', count: resolved, icon: <FaCheck />, color: '#27ae60' },
    { title: 'Rejected', count: rejected, icon: <FaTimes />, color: '#e74c3c' },
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
        <h1 className="admin-title"><FaUser style={{ marginRight: 10 }} />Admin Dashboard</h1>
        <div className="admin-stats-grid">
          {stats.map((stat, index) => (
            <div className="admin-stat-card" key={index} style={{ borderLeft: `6px solid ${stat.color}` }}>
              <div className="admin-stat-icon" style={{ color: stat.color }}>{stat.icon}</div>
              <div className="admin-stat-content">
                <div className="admin-stat-count">{stat.count}</div>
                <div className="admin-stat-title">{stat.title}</div>
              </div>
            </div>
          ))}
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {loading ? (
          <p>Loading complaints...</p>
        ) : (
          <div className="admin-table-section">
            <h2 className="admin-section-title"><FaClipboardList style={{ marginRight: 8 }} />All Complaints</h2>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Student</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((complaint, idx) => (
                    <tr key={complaint._id} className={idx % 2 === 0 ? 'even-row' : 'odd-row'}>
                      <td>{complaint._id.slice(-5)}</td>
                      <td>{complaint.name || 'N/A'}</td>
                      <td>{complaint.category || 'N/A'}</td>
                      <td>
                        <span className="status-badge" style={{ background: statusColors[complaint.status] || '#7f8c8d' }}>
                          {complaint.status}
                        </span>
                        <select
                          value={complaint.status}
                          onChange={e => updateStatus(complaint._id, e.target.value)}
                          className="admin-status-select"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Resolved">Resolved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td>{complaint.createdAt ? new Date(complaint.createdAt).toLocaleDateString() : ''}</td>
                      <td>
                        <button
                          onClick={() => deleteComplaint(complaint._id)}
                          className="admin-delete-btn"
                          title="Delete Complaint"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
