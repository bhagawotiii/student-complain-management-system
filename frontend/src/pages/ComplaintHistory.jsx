import React, { useEffect, useState } from 'react';
import { FaClipboardList, FaMapMarkerAlt, FaTag, FaFileAlt, FaCalendarAlt, FaEye, FaDownload } from 'react-icons/fa';
import './ComplaintHistory.css';

const ComplaintHistory = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/complaints/my-complaints', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        setComplaints(data);
      } catch (err) {
        setComplaints([]);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return '#A0522D';
      case 'Resolved': return '#8B7355';
      case 'Rejected': return '#A0522D';
      default: return '#8D6E63';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return '⏳';
      case 'Resolved': return '✅';
      case 'Rejected': return '❌';
      default: return '📋';
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner} className="loading-spinner"></div>
        <p>Loading your complaint history...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📋 Complaint History</h1>
        <p style={styles.subtitle}>Track all your submitted complaints and their current status</p>
      </div>

      {complaints.length === 0 ? (
        <div style={styles.emptyState}>
          <FaClipboardList size={60} color="#8B7355" />
          <h3>No Complaints Yet</h3>
          <p>You haven't submitted any complaints yet. Start by lodging your first complaint!</p>
        </div>
      ) : (
        <div style={styles.complaintsGrid}>
          {complaints.map((complaint) => (
            <div key={complaint._id} style={styles.complaintCard}>
              <div style={styles.cardHeader}>
                <div style={styles.statusBadge}>
                  <span style={styles.statusIcon}>{getStatusIcon(complaint.status)}</span>
                  <span style={{...styles.statusText, color: getStatusColor(complaint.status)}}>
                    {complaint.status || 'Submitted'}
                  </span>
                </div>
                <div style={styles.dateInfo}>
                  <FaCalendarAlt size={14} color="#8D6E63" />
                  <span style={styles.dateText}>
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div style={styles.cardContent}>
                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>
                    <FaClipboardList size={16} color="#8B7355" />
                    <span>Complaint Title</span>
                  </div>
                  <p style={styles.fieldValue}>{complaint.name || 'Untitled Complaint'}</p>
                </div>

                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>
                    <FaMapMarkerAlt size={16} color="#8B7355" />
                    <span>Location</span>
                  </div>
                  <p style={styles.fieldValue}>{complaint.address || 'Not specified'}</p>
                </div>

                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>
                    <FaTag size={16} color="#8B7355" />
                    <span>Category</span>
                  </div>
                  <span style={styles.categoryBadge}>{complaint.category || 'General'}</span>
                </div>

                <div style={styles.fieldGroup}>
                  <div style={styles.fieldLabel}>
                    <FaFileAlt size={16} color="#8B7355" />
                    <span>Details</span>
                  </div>
                  <p style={styles.detailsText}>
                    {complaint.details || 'No details provided'}
                  </p>
                </div>

                {complaint.filePath && (
                  <div style={styles.fieldGroup}>
                    <div style={styles.fieldLabel}>
                      <FaDownload size={16} color="#8B7355" />
                      <span>Attachment</span>
                    </div>
                    <a 
                      href={`http://localhost:5000/${complaint.filePath.replace('\\', '/')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={styles.fileLink}
                    >
                      <FaEye size={14} />
                      <span>View File</span>
                    </a>
                  </div>
                )}
              </div>

              <div style={styles.cardFooter}>
                <span style={styles.timeText}>
                  Submitted at {new Date(complaint.createdAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    backgroundColor: '#fafafa',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontSize: '18px',
    color: '#8D6E63'
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #8B7355',
    borderRadius: '50%',
    marginBottom: '20px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  title: {
    fontSize: '2.5rem',
    color: '#5D4037',
    margin: '0 0 10px 0',
    fontWeight: 'bold',
    fontFamily: 'Georgia, serif'
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#8D6E63',
    margin: '0',
    fontStyle: 'italic'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '20px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)'
  },
  complaintsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    gap: '25px',
    padding: '20px 0'
  },
  complaintCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '20px',
    padding: '25px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 35px rgba(0,0,0,0.15)'
    }
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '15px',
    borderBottom: '2px solid rgba(139, 115, 85, 0.1)'
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 15px',
    borderRadius: '20px',
    backgroundColor: 'rgba(139, 115, 85, 0.1)',
    border: '1px solid rgba(139, 115, 85, 0.2)'
  },
  statusIcon: {
    fontSize: '16px'
  },
  statusText: {
    fontSize: '0.9rem',
    fontWeight: '600'
  },
  dateInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#8D6E63',
    fontSize: '0.85rem'
  },
  dateText: {
    fontStyle: 'italic'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px'
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  fieldLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.9rem',
    color: '#5D4037',
    fontWeight: '600'
  },
  fieldValue: {
    margin: '0',
    fontSize: '1rem',
    color: '#2c3e50',
    fontWeight: '500'
  },
  categoryBadge: {
    display: 'inline-block',
    padding: '6px 12px',
    backgroundColor: 'rgba(139, 115, 85, 0.1)',
    color: '#8B7355',
    borderRadius: '15px',
    fontSize: '0.85rem',
    fontWeight: '500',
    border: '1px solid rgba(139, 115, 85, 0.2)'
  },
  detailsText: {
    margin: '0',
    fontSize: '0.95rem',
    color: '#7f8c8d',
    lineHeight: '1.5',
    fontStyle: 'italic'
  },
  fileLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    color: '#8B7355',
    textDecoration: 'none',
    padding: '6px 12px',
    borderRadius: '12px',
    backgroundColor: 'rgba(139, 115, 85, 0.1)',
    border: '1px solid rgba(139, 115, 85, 0.2)',
    fontSize: '0.85rem',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: 'rgba(139, 115, 85, 0.2)',
      transform: 'translateY(-1px)'
    }
  },
  cardFooter: {
    marginTop: '20px',
    paddingTop: '15px',
    borderTop: '2px solid rgba(139, 115, 85, 0.1)',
    textAlign: 'center'
  },
  timeText: {
    fontSize: '0.8rem',
    color: '#A1887F',
    fontStyle: 'italic'
  }
};

export default ComplaintHistory; 