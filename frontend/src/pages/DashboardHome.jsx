import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClipboardList, FaCheckCircle, FaClock, FaExclamationTriangle, FaPlus, FaHistory, FaBell, FaChartLine, FaUserGraduate, FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import './DashboardHome.css';

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
      
      // Fetch user's complaints
      const response = await axios.get('http://localhost:5000/api/complaints/my-complaints', { headers });
      const complaints = response.data;
      
      // Calculate statistics
      const stats = {
        total: complaints.length,
        pending: complaints.filter(c => c.status === 'Pending').length,
        resolved: complaints.filter(c => c.status === 'Resolved').length,
        rejected: complaints.filter(c => c.status === 'Rejected').length
      };
      
      setStats(stats);
      setRecentComplaints(complaints.slice(0, 5)); // Get latest 5
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return '#f39c12';
      case 'Resolved': return '#27ae60';
      case 'Rejected': return '#e74c3c';
      default: return '#7f8c8d';
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
    <div style={styles.container} className="dashboard-container">
      {/* Welcome Section */}
      {/* <div style={styles.welcomeSection} className="welcome-section">
        <div style={styles.welcomeContent}>
          <div style={styles.welcomeText}>
            <h1 style={styles.greeting}>{getGreeting()}, {user.username}! 👋</h1>
            <p style={styles.welcomeSubtext}>Here's what's happening with your complaints today</p>
          </div>
          <div style={styles.welcomeIcon}>
            <FaUserGraduate size={60} color="#3498db" />
          </div>
        </div>
      </div> */}

      {/* Statistics Cards */}
      <div style={styles.statsGrid} className="stats-grid">
        <div style={styles.statCard} className="stat-card">
          <div style={styles.statIcon}>
            <FaClipboardList size={30} color="#3498db" />
          </div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{stats.total}</h3>
            <p style={styles.statLabel}>Total Complaints</p>
          </div>
        </div>

        <div style={styles.statCard} className="stat-card">
          <div style={styles.statIcon}>
            <FaClock size={30} color="#f39c12" />
          </div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{stats.pending}</h3>
            <p style={styles.statLabel}>Pending</p>
          </div>
        </div>

        <div style={styles.statCard} className="stat-card">
          <div style={styles.statIcon}>
            <FaCheckCircle size={30} color="#27ae60" />
          </div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{stats.resolved}</h3>
            <p style={styles.statLabel}>Resolved</p>
          </div>
        </div>

        <div style={styles.statCard} className="stat-card">
          <div style={styles.statIcon}>
            <FaExclamationTriangle size={30} color="#e74c3c" />
          </div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{stats.rejected}</h3>
            <p style={styles.statLabel}>Rejected</p>
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      <div style={styles.chartSection}>
        <h3 style={styles.sectionTitle}>📊 Complaint Status Overview</h3>
        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div 
              style={{
                ...styles.progressFill,
                width: `${stats.total > 0 ? (stats.resolved / stats.total) * 100 : 0}%`,
                backgroundColor: '#27ae60'
              }}
            ></div>
          </div>
          <p style={styles.progressText}>
            {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}% of complaints resolved
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={styles.quickActionsSection}>
        <h3 style={styles.sectionTitle}>⚡ Quick Actions</h3>
        <div style={styles.quickActionsGrid} className="quick-actions-grid">
          <div style={styles.actionCard} className="action-card" onClick={() => navigate('/student/complaint')}>
            <FaPlus size={24} color="#3498db" />
            <h4>New Complaint</h4>
            <p>Register a new complaint</p>
          </div>
          <div style={styles.actionCard} className="action-card" onClick={() => navigate('/student/history')}>
            <FaHistory size={24} color="#9b59b6" />
            <h4>View History</h4>
            <p>Check all your complaints</p>
          </div>
          <div style={styles.actionCard} className="action-card">
            <FaBell size={24} color="#f39c12" />
            <h4>Notifications</h4>
            <p>View recent updates</p>
          </div>
          <div style={styles.actionCard} className="action-card">
            <FaChartLine size={24} color="#e74c3c" />
            <h4>Analytics</h4>
            <p>Detailed statistics</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={styles.recentSection}>
        <h3 style={styles.sectionTitle}>🕒 Recent Activity</h3>
        <div style={styles.recentList}>
          {recentComplaints.length > 0 ? (
            recentComplaints.map((complaint, index) => (
              <div key={complaint._id || index} style={styles.recentItem} className="recent-item">
                <div style={styles.recentIcon}>
                  <FaClipboardList size={20} color={getStatusColor(complaint.status)} />
                </div>
                <div style={styles.recentContent}>
                  <h4 style={styles.recentTitle}>{complaint.title}</h4>
                  <p style={styles.recentStatus}>
                    Status: <span style={{ color: getStatusColor(complaint.status) }}>
                      {complaint.status}
                    </span>
                  </p>
                  <p style={styles.recentDate}>
                    <FaCalendarAlt size={12} /> {new Date(complaint.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div style={styles.emptyState}>
              <FaClipboardList size={40} color="#bdc3c7" />
              <p>No complaints yet. Start by registering your first complaint!</p>
            </div>
          )}
        </div>
      </div>

      {/* System Status */}
      <div style={styles.systemStatus}>
        <div style={styles.statusItem}>
          <div style={styles.statusDot}></div>
          <span>System Status: Operational</span>
        </div>
        <div style={styles.statusItem}>
          <div style={{...styles.statusDot, backgroundColor: '#27ae60'}}></div>
          <span>Database: Connected</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
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
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    marginBottom: '20px'
  },
  welcomeSection: {
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '20px',
    padding: '30px',
    marginBottom: '30px',
    color: 'white',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
  },
  welcomeContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  greeting: {
    fontSize: '2.5rem',
    margin: '0 0 10px 0',
    fontWeight: 'bold'
  },
  welcomeSubtext: {
    fontSize: '1.1rem',
    opacity: '0.9',
    margin: '0'
  },
  welcomeIcon: {
    opacity: '0.8'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '25px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s ease',
    cursor: 'pointer'
  },
  statIcon: {
    marginRight: '20px',
    padding: '15px',
    borderRadius: '12px',
    backgroundColor: '#f8f9fa'
  },
  statContent: {
    flex: 1
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: '0 0 5px 0',
    color: '#2c3e50'
  },
  statLabel: {
    fontSize: '1rem',
    color: '#7f8c8d',
    margin: '0',
    fontWeight: '500'
  },
  chartSection: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '25px',
    marginBottom: '30px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    margin: '0 0 20px 0',
    color: '#2c3e50',
    fontWeight: '600'
  },
  progressContainer: {
    marginTop: '20px'
  },
  progressBar: {
    width: '100%',
    height: '12px',
    backgroundColor: '#ecf0f1',
    borderRadius: '6px',
    overflow: 'hidden',
    marginBottom: '10px'
  },
  progressFill: {
    height: '100%',
    borderRadius: '6px',
    transition: 'width 0.3s ease'
  },
  progressText: {
    fontSize: '1rem',
    color: '#7f8c8d',
    margin: '0',
    textAlign: 'center'
  },
  quickActionsSection: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '25px',
    marginBottom: '30px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
  },
  quickActionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px'
  },
  actionCard: {
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: '2px solid transparent',
    ':hover': {
      backgroundColor: '#e9ecef',
      borderColor: '#3498db'
    }
  },
  recentSection: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '25px',
    marginBottom: '30px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
  },
  recentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  recentItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    borderRadius: '10px',
    backgroundColor: '#f8f9fa',
    transition: 'background-color 0.2s ease'
  },
  recentIcon: {
    marginRight: '15px',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: 'white'
  },
  recentContent: {
    flex: 1
  },
  recentTitle: {
    margin: '0 0 5px 0',
    fontSize: '1.1rem',
    color: '#2c3e50'
  },
  recentStatus: {
    margin: '0 0 5px 0',
    fontSize: '0.9rem',
    color: '#7f8c8d'
  },
  recentDate: {
    margin: '0',
    fontSize: '0.8rem',
    color: '#95a5a6',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px',
    color: '#7f8c8d'
  },
  systemStatus: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
  },
  statusItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.9rem',
    color: '#7f8c8d'
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#27ae60'
  }
};

export default DashboardHome; 