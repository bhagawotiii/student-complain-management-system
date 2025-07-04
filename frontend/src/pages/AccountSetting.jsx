import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaLock, FaKey, FaUserCircle } from 'react-icons/fa';
import './AccountSetting.css';

const AccountSetting = () => {
  const [details, setDetails] = useState({ name: '', address: '', email: '' });
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [msg, setMsg] = useState('');
  const [pwMsg, setPwMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Optionally, fetch current details from backend here
    setUsername(localStorage.getItem('username') || 'Student');
  }, []);

  const handleDetailsChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handlePasswordsChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/auth/update-details', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(details),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Update failed');
      setMsg('Details updated successfully!');
    } catch (err) {
      setMsg(err.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPwMsg('');
    setPwLoading(true);
    if (passwords.newPassword !== passwords.confirmPassword) {
      setPwMsg('New passwords do not match');
      setPwLoading(false);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword: passwords.oldPassword, newPassword: passwords.newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Password change failed');
      setPwMsg('Password changed successfully!');
      setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setPwMsg(err.message || 'Password change failed');
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <div className="account-setting-container">
      <div className="account-card">
        <div className="account-header">
          <FaUserCircle className="account-avatar" />
          <div>
            <div className="account-username">{username}</div>
            <div className="account-email">{details.email || 'your@email.com'}</div>
          </div>
        </div>
        <div className="divider" />
        <form onSubmit={handleDetailsSubmit} className="account-form">
          <h3 className="section-title">Update Details</h3>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={details.name}
              onChange={handleDetailsChange}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <FaMapMarkerAlt className="input-icon" />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={details.address}
              onChange={handleDetailsChange}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={details.email}
              onChange={handleDetailsChange}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="save-btn" disabled={loading}>{loading ? 'Updating...' : 'Update Details'}</button>
          {msg && <p className={msg.includes('success') ? 'success-msg' : 'error-msg'}>{msg}</p>}
        </form>
        <div className="divider" />
        <form onSubmit={handlePasswordSubmit} className="account-form">
          <h3 className="section-title">Change Password</h3>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              value={passwords.oldPassword}
              onChange={handlePasswordsChange}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <FaKey className="input-icon" />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={passwords.newPassword}
              onChange={handlePasswordsChange}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <FaKey className="input-icon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={passwords.confirmPassword}
              onChange={handlePasswordsChange}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="save-btn" disabled={pwLoading}>{pwLoading ? 'Changing...' : 'Change Password'}</button>
          {pwMsg && <p className={pwMsg.includes('success') ? 'success-msg' : 'error-msg'}>{pwMsg}</p>}
        </form>
      </div>
    </div>
  );
};

export default AccountSetting; 