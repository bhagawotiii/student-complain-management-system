import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClipboardList, FaCheckCircle, FaClock, FaExclamationTriangle, FaPlus, FaHistory, FaBell, FaChartLine, FaUserCircle, FaCalendarAlt, FaMapMarkerAlt, FaTag, FaFileAlt } from 'react-icons/fa';
import axios from 'axios';
import './DashboardHome.css';

const vibrant = {
  blue: '#2196f3',
  teal: '#1de9b6',
  orange: '#ff9800',
  green: '#43a047',
  pink: '#e040fb',
  yellow: '#ffd600',
  bg: 'linear-gradient(135deg, #e3f2fd 0%, #fffde7 100%)',
};

const DashboardHome = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    rejected: 0
  });
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    username: localStorage.getItem('username') || 'Student',
    role: localStorage.getItem('userRole') || 'student'
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get('http://localhost:5000/api/complaints/my-complaints', { headers });
      const complaints = response.data;
      const stats = {
        total: complaints.length,
        pending: complaints.filter(c => c.status === 'Pending').length,
        resolved: complaints.filter(c => c.status === 'Resolved').length,
        rejected: complaints.filter(c => c.status === 'Rejected').length
      };
      setStats(stats);
      setRecentComplaints(complaints.slice(0, 5));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return vibrant.orange;
      case 'Resolved': return vibrant.green;
      case 'Rejected': return '#e53935';
      default: return vibrant.blue;
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner} className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div style={{ ...styles.container, background: vibrant.bg }} className="dashboard-container">
      {/* Vibrant Header */}
      <div style={styles.vibrantHeader} className="vibrant-header">
        <div style={styles.headerLeft}>
          <FaUserCircle size={60} color={vibrant.blue} style={{ background: '#fff', borderRadius: '50%', boxShadow: '0 2px 8px #2196f344' }} />
          <div style={{ marginLeft: 18 }}>
            <h1 style={styles.headerTitle}>{getGreeting()}, {user.username}!</h1>
            <p style={styles.headerSubtitle}>Welcome to your student dashboard</p>
          </div>
        </div>
        <div style={styles.headerRight}>
          <span style={styles.motivation}>"Every complaint is a chance to improve!"</span>
        </div>
      </div>

      {/* Progress Chart */}
      <div style={styles.chartSection} className="fade-in">
        <h3 style={styles.sectionTitle}>📊 Complaint Status Overview</h3>
        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div 
              style={{
                ...styles.progressFill,
                width: `${stats.total > 0 ? (stats.resolved / stats.total) * 100 : 0}%`,
                background: `linear-gradient(90deg, ${vibrant.blue} 0%, ${vibrant.teal} 100%)`
              }}
            ></div>
          </div>
          <p style={styles.progressText}>
            {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}% of complaints resolved
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={styles.quickActionsSection} className="fade-in">
        <h3 style={styles.sectionTitle}>⚡ Quick Actions</h3>
        <div style={styles.quickActionsGrid} className="quick-actions-grid">
          <div style={{ ...styles.actionCard, borderColor: vibrant.blue }} className="action-card vibrant-hover" onClick={() => navigate('/student/complaint')}>
            <FaPlus size={24} color={vibrant.blue} />
            <h4>New Complaint</h4>
            <p>Register a new complaint</p>
          </div>
          <div style={{ ...styles.actionCard, borderColor: vibrant.teal }} className="action-card vibrant-hover" onClick={() => navigate('/student/history')}>
            <FaHistory size={24} color={vibrant.teal} />
            <h4>View History</h4>
            <p>Check all your complaints</p>
          </div>
          <div style={{ ...styles.actionCard, borderColor: vibrant.orange }} className="action-card vibrant-hover">
            <FaBell size={24} color={vibrant.orange} />
            <h4>Notifications</h4>
            <p>View recent updates</p>
          </div>
          <div style={{ ...styles.actionCard, borderColor: vibrant.green }} className="action-card vibrant-hover">
            <FaChartLine size={24} color={vibrant.green} />
            <h4>Analytics</h4>
            <p>Detailed statistics</p>
          </div>
        </div>
      </div>

      {/* Direct Complaints */}
      <div style={styles.complaintsSection} className="fade-in">
        <h3 style={styles.sectionTitle}>📋 Your Complaints</h3>
        {recentComplaints.length > 0 ? (
          <div style={styles.complaintsGrid}>
            {recentComplaints.map((complaint, index) => (
              <div key={complaint._id || index} style={{ ...styles.complaintCard, borderLeft: `6px solid ${getStatusColor(complaint.status)}` }} className="complaint-card vibrant-hover">
                <div style={styles.cardHeader}>
                  <div style={styles.statusBadge}>
                    <span style={styles.statusIcon}>
                      {complaint.status === 'Pending' ? <FaClock color={vibrant.orange} /> :
                        complaint.status === 'Resolved' ? <FaCheckCircle color={vibrant.green} /> :
                        complaint.status === 'Rejected' ? <FaExclamationTriangle color="#e53935" /> : <FaClipboardList color={vibrant.blue} />}
                    </span>
                    <span style={{ ...styles.statusText, color: getStatusColor(complaint.status) }}>
                      {complaint.status || 'Submitted'}
                    </span>
                  </div>
                  <div style={styles.dateInfo}>
                    <FaCalendarAlt size={14} color={vibrant.blue} />
                    <span style={styles.dateText}>
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div style={styles.cardContent}>
                  <div style={styles.fieldGroup}>
                    <div style={styles.fieldLabel}>
                      <FaClipboardList size={16} color={vibrant.blue} />
                      <span>Title</span>
                    </div>
                    <p style={styles.fieldValue}>{complaint.name || complaint.title || 'Untitled Complaint'}</p>
                  </div>

                  <div style={styles.fieldGroup}>
                    <div style={styles.fieldLabel}>
                      <FaMapMarkerAlt size={16} color={vibrant.teal} />
                      <span>Location</span>
                    </div>
                    <p style={styles.fieldValue}>{complaint.address || 'Not specified'}</p>
                  </div>

                  <div style={styles.fieldGroup}>
                    <div style={styles.fieldLabel}>
                      <FaTag size={16} color={vibrant.pink} />
                      <span>Category</span>
                    </div>
                    <span style={{ ...styles.categoryBadge, background: vibrant.pink, color: '#fff' }}>{complaint.category || 'General'}</span>
                  </div>

                  <div style={styles.fieldGroup}>
                    <div style={styles.fieldLabel}>
                      <FaFileAlt size={16} color={vibrant.orange} />
                      <span>Details</span>
                    </div>
                    <p style={styles.detailsText}>
                      {complaint.details ?
                        (complaint.details.length > 100 ?
                          complaint.details.substring(0, 100) + '...' :
                          complaint.details) :
                        'No details provided'}
                    </p>
                  </div>
                </div>

                <div style={styles.cardFooter}>
                  <span style={styles.timeText}>
                    Submitted at {new Date(complaint.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <FaClipboardList size={60} color={vibrant.blue} />
            <h3>No Complaints Yet</h3>
            <p>You haven't submitted any complaints yet. Start by lodging your first complaint!</p>
          </div>
        )}
      </div>

      {/* System Status */}
      <div style={styles.systemStatus} className="fade-in">
        <div style={styles.statusItem}>
          <div style={{ ...styles.statusDot, backgroundColor: vibrant.blue }}></div>
          <span>System Status: Operational</span>
        </div>
        <div style={styles.statusItem}>
          <div style={{ ...styles.statusDot, backgroundColor: vibrant.green }}></div>
          <span>Database: Connected</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    transition: 'background 0.5s',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontSize: '18px',
    color: '#666'
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #2196f3',
    borderRadius: '50%',
    marginBottom: '20px',
    animation: 'spin 1s linear infinite'
  },
  vibrantHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'linear-gradient(90deg, #2196f3 0%, #1de9b6 100%)',
    borderRadius: '22px',
    padding: '32px 36px',
    marginBottom: '32px',
    boxShadow: '0 6px 32px rgba(33,150,243,0.10)',
    color: '#fff',
    animation: 'fadeIn 0.7s',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: '2.1rem',
    margin: 0,
    fontWeight: 700,
    color: '#fff',
    letterSpacing: '0.5px',
  },
  headerSubtitle: {
    fontSize: '1.1rem',
    color: '#e3f2fd',
    margin: '6px 0 0 0',
    fontStyle: 'italic',
    fontWeight: 400,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
  },
  motivation: {
    fontSize: '1.1rem',
    color: '#fffde7',
    fontStyle: 'italic',
    fontWeight: 500,
    letterSpacing: '0.2px',
    textShadow: '0 2px 8px #2196f344',
  },
  chartSection: {
    background: 'linear-gradient(90deg, #e3f2fd 0%, #fffde7 100%)',
    borderRadius: '18px',
    padding: '28px',
    marginBottom: '28px',
    boxShadow: '0 4px 18px rgba(33,150,243,0.08)',
    border: '1px solid #e3f2fd',
    animation: 'fadeIn 0.7s',
  },
  sectionTitle: {
    fontSize: '1.3rem',
    margin: '0 0 18px 0',
    color: '#2196f3',
    fontWeight: '600',
    fontFamily: 'inherit',
    letterSpacing: '0.2px',
  },
  progressContainer: {
    marginTop: '18px',
  },
  progressBar: {
    width: '100%',
    height: '15px',
    background: '#e3f2fd',
    borderRadius: '10px',
    overflow: 'hidden',
    marginBottom: '12px',
    boxShadow: '0 2px 8px #2196f344',
  },
  progressFill: {
    height: '100%',
    borderRadius: '10px',
    transition: 'width 0.5s ease',
  },
  progressText: {
    fontSize: '1rem',
    color: '#2196f3',
    margin: '0',
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 500,
  },
  quickActionsSection: {
    background: 'linear-gradient(90deg, #fffde7 0%, #e3f2fd 100%)',
    borderRadius: '18px',
    padding: '28px',
    marginBottom: '28px',
    boxShadow: '0 4px 18px rgba(255,193,7,0.08)',
    border: '1px solid #fffde7',
    animation: 'fadeIn 0.7s',
  },
  quickActionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '25px',
  },
  actionCard: {
    padding: '24px',
    borderRadius: '16px',
    background: '#fff',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
    border: '2px solid transparent',
    boxShadow: '0 2px 12px rgba(33,150,243,0.07)',
    fontWeight: 500,
  },
  complaintsSection: {
    background: 'linear-gradient(90deg, #e3f2fd 0%, #fffde7 100%)',
    borderRadius: '18px',
    padding: '28px',
    marginBottom: '28px',
    boxShadow: '0 4px 18px rgba(33,150,243,0.08)',
    border: '1px solid #e3f2fd',
    animation: 'fadeIn 0.7s',
  },
  complaintsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '25px',
    padding: '20px 0',
  },
  complaintCard: {
    background: '#fff',
    borderRadius: '16px',
    padding: '22px',
    boxShadow: '0 4px 18px rgba(33,150,243,0.08)',
    border: '1.5px solid #e3f2fd',
    transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
    cursor: 'pointer',
    marginBottom: '8px',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    paddingBottom: '10px',
    borderBottom: '1.5px solid #e3f2fd',
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 14px',
    borderRadius: '16px',
    background: '#f5f5f5',
    border: '1px solid #e3f2fd',
    fontWeight: 600,
  },
  statusIcon: {
    fontSize: '18px',
  },
  statusText: {
    fontSize: '0.95rem',
    fontWeight: '600',
  },
  dateInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: vibrant.blue,
    fontSize: '0.9rem',
  },
  dateText: {
    fontStyle: 'italic',
    color: vibrant.blue,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  fieldLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.92rem',
    color: vibrant.blue,
    fontWeight: '600',
  },
  fieldValue: {
    margin: '0',
    fontSize: '1.05rem',
    color: '#222',
    fontWeight: '500',
  },
  categoryBadge: {
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: '12px',
    fontSize: '0.9rem',
    fontWeight: '500',
    marginTop: '2px',
  },
  detailsText: {
    margin: '0',
    fontSize: '0.98rem',
    color: '#7f8c8d',
    lineHeight: '1.5',
    fontStyle: 'italic',
  },
  cardFooter: {
    marginTop: '14px',
    paddingTop: '10px',
    borderTop: '1.5px solid #e3f2fd',
    textAlign: 'center',
  },
  timeText: {
    fontSize: '0.85rem',
    color: '#2196f3',
    fontStyle: 'italic',
  },
  emptyState: {
    textAlign: 'center',
    padding: '50px',
    color: vibrant.blue,
    fontStyle: 'italic',
  },
  systemStatus: {
    display: 'flex',
    gap: '30px',
    justifyContent: 'center',
    padding: '25px',
    background: 'linear-gradient(90deg, #fffde7 0%, #e3f2fd 100%)',
    borderRadius: '18px',
    boxShadow: '0 4px 18px rgba(33,150,243,0.08)',
    border: '1px solid #fffde7',
    animation: 'fadeIn 0.7s',
  },
  statusItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '0.95rem',
    color: vibrant.blue,
  },
  statusDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: vibrant.blue,
  },
};

export default DashboardHome; 