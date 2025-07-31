import React, { useEffect, useState } from 'react';
import './Admin.css';
import { FaUsers, FaExclamationCircle, FaCheckCircle, FaClipboardList, FaTrash, FaUser, FaClock, FaCheck, FaTimes, FaCog, FaTable, FaSignOutAlt, FaUserShield } from 'react-icons/fa';
import { NavLink, Routes, Route } from 'react-router-dom';

const vibrant = {
  blue: '#2196f3',
  teal: '#1de9b6',
  orange: '#ff9800',
  green: '#43a047',
  pink: '#e040fb',
  yellow: '#ffd600',
  bg: 'linear-gradient(135deg, #e3f2fd 0%, #fffde7 100%)',
};

const statusColors = {
  Pending: vibrant.orange,
  Resolved: vibrant.green,
  Rejected: '#e53935',
};

const AdminPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const adminName = localStorage.getItem('username') || 'Admin';

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
    { title: 'Total Complaints', count: total, icon: <FaClipboardList />, color: vibrant.blue, bg: 'linear-gradient(90deg, #2196f3 0%, #1de9b6 100%)' },
    { title: 'Pending', count: pending, icon: <FaClock />, color: vibrant.orange, bg: 'linear-gradient(90deg, #ff9800 0%, #ffd600 100%)' },
    { title: 'Resolved', count: resolved, icon: <FaCheck />, color: vibrant.green, bg: 'linear-gradient(90deg, #43a047 0%, #1de9b6 100%)' },
    { title: 'Rejected', count: rejected, icon: <FaTimes />, color: '#e53935', bg: 'linear-gradient(90deg, #e53935 0%, #ffd600 100%)' },
  ];

  return (
    <div className="admin-root-flex" style={{ display: 'flex', minHeight: '100vh', background: vibrant.bg, fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      {/* Sidebar */}
      <aside className="sidebar" style={{ background: '#fff', color: '#222', boxShadow: '2px 0 12px rgba(0,0,0,0.06)', borderRadius: '0 24px 24px 0', padding: '32px 0 0 0', width: 260, minWidth: 220, zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <FaUser size={60} style={{ color: '#2563eb', marginBottom: 10 }} />
          <div style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 4 }}>{adminName}</div>
          <div style={{ fontSize: '0.95rem', color: '#888' }}>Admin Panel</div>
        </div>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>
            <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'active-link' : ''} style={({ isActive }) => ({ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 24px', borderRadius: 8, color: isActive ? '#fff' : '#2563eb', background: isActive ? '#2563eb' : 'none', fontWeight: 500, marginBottom: 8, textDecoration: 'none', transition: 'background 0.2s' })}><FaTable /> Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/admin/complaints" className={({ isActive }) => isActive ? 'active-link' : ''} style={({ isActive }) => ({ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 24px', borderRadius: 8, color: isActive ? '#fff' : '#2563eb', background: isActive ? '#2563eb' : 'none', fontWeight: 500, marginBottom: 8, textDecoration: 'none', transition: 'background 0.2s' })}><FaClipboardList /> View Complaints</NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className={({ isActive }) => isActive ? 'active-link' : ''} style={({ isActive }) => ({ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 24px', borderRadius: 8, color: isActive ? '#fff' : '#2563eb', background: isActive ? '#2563eb' : 'none', fontWeight: 500, marginBottom: 8, textDecoration: 'none', transition: 'background 0.2s' })}><FaUsers /> Manage Users</NavLink>
          </li>
          <li>
            <NavLink to="/admin/settings" className={({ isActive }) => isActive ? 'active-link' : ''} style={({ isActive }) => ({ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 24px', borderRadius: 8, color: isActive ? '#fff' : '#2563eb', background: isActive ? '#2563eb' : 'none', fontWeight: 500, marginBottom: 8, textDecoration: 'none', transition: 'background 0.2s' })}><FaCog /> Settings</NavLink>
          </li>
          <li>
            <button
              style={{ background: 'none', border: 'none', color: '#d9534f', cursor: 'pointer', padding: '12px 24px', borderRadius: 8, fontWeight: 500, width: '100%', textAlign: 'left', marginTop: 16 }}
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('userRole');
                localStorage.removeItem('username');
                window.location.href = '/';
              }}
            >
              <FaSignOutAlt style={{ marginRight: 10 }} /> Logout
            </button>
          </li>
        </ul>
      </aside>
      {/* Main Content */}
      <div className="admin-main-flex" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, padding: '0 0 0 0', zIndex: 1 }}>
        {/* Vibrant Header INSIDE main content */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(90deg, #2196f3 0%, #1de9b6 100%)',
          borderRadius: 22,
          padding: '32px 36px',
          margin: '32px 32px 32px 32px',
          boxShadow: '0 6px 32px rgba(33,150,243,0.10)',
          color: '#fff',
          animation: 'fadeIn 0.7s',
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FaUserShield size={60} color={vibrant.blue} style={{ background: '#fff', borderRadius: '50%', boxShadow: '0 2px 8px #2196f344' }} />
            <div style={{ marginLeft: 18 }}>
              <h1 style={{ fontSize: '2.1rem', margin: 0, fontWeight: 700, color: '#fff', letterSpacing: '0.5px' }}>Welcome, {adminName}!</h1>
              <p style={{ fontSize: '1.1rem', color: '#e3f2fd', margin: '6px 0 0 0', fontStyle: 'italic', fontWeight: 400 }}>Manage your system efficiently from this dashboard</p>
            </div>
          </div>
          <div style={{ fontSize: '1.1rem', color: '#fffde7', fontStyle: 'italic', fontWeight: 500, letterSpacing: '0.2px', textShadow: '0 2px 8px #2196f344' }}>
            "Leadership is the capacity to translate vision into reality."
          </div>
        </div>
        <main className="dashboard-main" style={{ flex: 1, padding: '0 32px 40px 32px', background: 'transparent', borderRadius: 24 }}>
          <Routes>
            <Route path="dashboard" element={
              <>
                <div className="fade-in" style={{ marginBottom: 32 }}>
                  <div className="admin-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 28, marginBottom: 40 }}>
                    {stats.map((stat, index) => (
                      <div className="admin-stat-card vibrant-hover" key={index} style={{ background: stat.bg, borderRadius: 16, boxShadow: '0 4px 18px rgba(33,150,243,0.10)', display: 'flex', alignItems: 'center', padding: '26px 20px', gap: 18, borderLeft: `6px solid ${stat.color}`, color: '#fff', transition: 'transform 0.2s, box-shadow 0.2s' }}>
                        <div className="admin-stat-icon" style={{ color: '#fff', fontSize: '2.2rem', opacity: 0.95 }}>{stat.icon}</div>
                        <div className="admin-stat-content">
                          <div className="admin-stat-count" style={{ fontSize: '2.1rem', fontWeight: 'bold', color: '#fff' }}>{stat.count}</div>
                          <div className="admin-stat-title" style={{ fontSize: '1.1rem', color: '#fffde7' }}>{stat.title}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
              </>
            } />
            <Route path="complaints" element={
              <div className="admin-table-section fade-in" style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 18px rgba(33,150,243,0.08)', padding: '32px 20px 20px 20px', marginTop: 18 }}>
                <h2 className="admin-section-title" style={{ fontSize: '1.3rem', color: vibrant.blue, marginBottom: 18, display: 'flex', alignItems: 'center' }}><FaClipboardList style={{ marginRight: 8 }} />All Complaints</h2>
                <div className="admin-table-wrapper" style={{ overflowX: 'auto' }}>
                  <table className="admin-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: '#fff', borderRadius: 10, overflow: 'hidden', boxShadow: '0 2px 8px rgba(33,150,243,0.06)' }}>
                    <thead>
                      <tr style={{ background: '#e3f2fd' }}>
                        <th style={{ padding: '12px 8px', fontWeight: 700, color: vibrant.blue, fontSize: '1rem' }}>S.N.</th>
                        <th style={{ padding: '12px 8px', fontWeight: 700, color: vibrant.blue, fontSize: '1rem' }}>Student</th>
                        <th style={{ padding: '12px 8px', fontWeight: 700, color: vibrant.blue, fontSize: '1rem' }}>Category</th>
                        <th style={{ padding: '12px 8px', fontWeight: 700, color: vibrant.blue, fontSize: '1rem' }}>Status</th>
                        <th style={{ padding: '12px 8px', fontWeight: 700, color: vibrant.blue, fontSize: '1rem' }}>Date</th>
                        <th style={{ padding: '12px 8px', fontWeight: 700, color: vibrant.blue, fontSize: '1rem' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {complaints.map((complaint, idx) => (
                        <tr key={complaint._id} className={idx % 2 === 0 ? 'even-row' : 'odd-row'} style={{ background: idx % 2 === 0 ? '#f9fbfd' : '#fff', transition: 'background 0.2s' }}>
                          <td style={{ padding: '10px 8px', fontWeight: 500 }}>{idx + 1}</td>
                          <td style={{ padding: '10px 8px' }}>{complaint.name || 'N/A'}</td>
                          <td style={{ padding: '10px 8px' }}>{complaint.category || 'N/A'}</td>
                          <td style={{ padding: '10px 8px' }}>
                            <span style={{ padding: '6px 16px', borderRadius: 12, background: statusColors[complaint.status] + '22', color: statusColors[complaint.status], fontWeight: 600, fontSize: '0.98rem' }}>{complaint.status}</span>
                            <select
                              value={complaint.status}
                              onChange={e => updateStatus(complaint._id, e.target.value)}
                              className="admin-status-select"
                              style={{ marginLeft: 10, padding: '4px 8px', borderRadius: 6, border: '1px solid #ddd', fontSize: '0.98rem' }}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Resolved">Resolved</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </td>
                          <td style={{ padding: '10px 8px' }}>{complaint.createdAt ? new Date(complaint.createdAt).toLocaleDateString() : ''}</td>
                          <td style={{ padding: '10px 8px' }}>
                            <button
                              onClick={() => deleteComplaint(complaint._id)}
                              className="admin-delete-btn"
                              title="Delete Complaint"
                              style={{ background: 'none', border: 'none', color: '#d9534f', fontSize: '1.2rem', cursor: 'pointer', borderRadius: 6, padding: 6, transition: 'background 0.2s' }}
                              onMouseOver={e => e.target.style.background = '#fbe9e7'}
                              onMouseOut={e => e.target.style.background = 'none'}
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
            } />
            <Route path="users" element={<div className="fade-in"><h2>Manage Users</h2><p>Coming soon...</p></div>} />
            <Route path="settings" element={<div className="fade-in"><h2>Settings</h2><p>Coming soon...</p></div>} />
            <Route path="*" element={
              <div className="fade-in" style={{
                maxWidth: 520,
                margin: '60px auto',
                background: '#fff',
                borderRadius: 18,
                boxShadow: '0 6px 32px rgba(30,58,138,0.10)',
                padding: '48px 36px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <FaUser size={64} style={{ color: '#2563eb', marginBottom: 18 }} />
                <h2 style={{ fontSize: '2.1rem', fontWeight: 700, color: '#222', marginBottom: 10 }}>Welcome, {adminName}!</h2>
                <div style={{ color: '#555', fontSize: '1.1rem', marginBottom: 24 }}>
                  Manage your system efficiently from this dashboard.
                </div>
                <div style={{ display: 'flex', gap: 18, justifyContent: 'center', marginTop: 10 }}>
                  <NavLink to="/admin/complaints" style={{ background: vibrant.blue, color: '#fff', padding: '10px 22px', borderRadius: 8, fontWeight: 500, textDecoration: 'none', fontSize: '1rem', boxShadow: '0 2px 8px rgba(37,99,235,0.08)', transition: 'background 0.2s' }}>View Complaints</NavLink>
                  <NavLink to="/admin/users" style={{ background: '#f0f4f8', color: vibrant.blue, padding: '10px 22px', borderRadius: 8, fontWeight: 500, textDecoration: 'none', fontSize: '1rem', boxShadow: '0 2px 8px rgba(37,99,235,0.04)', transition: 'background 0.2s' }}>Manage Users</NavLink>
                  <NavLink to="/admin/settings" style={{ background: '#f0f4f8', color: vibrant.blue, padding: '10px 22px', borderRadius: 8, fontWeight: 500, textDecoration: 'none', fontSize: '1rem', boxShadow: '0 2px 8px rgba(37,99,235,0.04)', transition: 'background 0.2s' }}>Settings</NavLink>
                </div>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
