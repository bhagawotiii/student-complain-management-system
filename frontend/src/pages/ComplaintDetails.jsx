import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios.get(`http://localhost:5000/api/complaints/${id}`)
      .then(res => {
        console.log('Complaint data fetched:', res.data);
        setComplaint(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch complaint:', err);
        setError('Failed to load complaint. Please try again later.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={styles.loading}>Loading Complaint...</div>;

  if (error) return (
    <div style={styles.loading}>
      <p>{error}</p>
      <button onClick={() => navigate(-1)} style={styles.backButton}>Go Back</button>
    </div>
  );

  if (!complaint) return (
    <div style={styles.loading}>
      <p>Complaint not found.</p>
      <button onClick={() => navigate(-1)} style={styles.backButton}>Go Back</button>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{complaint.title}</h2>
        <p style={styles.description}>{complaint.description}</p>
        <div style={styles.statusSection}>
          <strong>Status:</strong>
          <span
            style={{
              ...styles.status,
              backgroundColor:
                complaint.status === 'Pending' ? '#f39c12' :
                complaint.status === 'Resolved' ? '#27ae60' :
                complaint.status === 'Rejected' ? '#e74c3c' :
                '#7f8c8d' // default gray if unknown status
            }}
          >
            {complaint.status || 'Unknown'}
          </span>
        </div>
        <button onClick={() => navigate(-1)} style={styles.backButton}>Back to Complaints</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    display: 'flex',
    justifyContent: 'center',
    background: '#f8f9fa',
    minHeight: '100vh',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
    padding: '30px',
    maxWidth: '600px',
    width: '100%',
    fontFamily: 'Segoe UI, sans-serif',
  },
  title: {
    fontSize: '24px',
    marginBottom: '15px',
    color: '#333',
  },
  description: {
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '25px',
    color: '#555',
  },
  statusSection: {
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '25px',
  },
  status: {
    padding: '5px 12px',
    borderRadius: '8px',
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  loading: {
    textAlign: 'center',
    paddingTop: '100px',
    fontSize: '18px',
    color: '#999',
  },
  backButton: {
    marginTop: '15px',
    padding: '8px 16px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default ComplaintDetails;
