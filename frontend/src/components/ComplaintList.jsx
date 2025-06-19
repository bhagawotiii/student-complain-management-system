import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ComplaintList = ({ userType }) => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/complaints')
      .then(res => setComplaints(res.data))
      .catch(err => console.error(err));
  }, []);

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return { color: 'green', fontWeight: 'bold' };
      case 'pending':
        return { color: 'orange', fontWeight: 'bold' };
      case 'rejected':
        return { color: 'red', fontWeight: 'bold' };
      default:
        return { color: '#555' };
    }
  };

  return (
    <div style={styles.listContainer}>
      {complaints.map(c => (
        <div key={c.id} style={styles.card}>
          <h4 style={styles.title}>
            <Link to={`/complaints/${c.id}`} style={styles.link}>
              {c.title}
            </Link>
          </h4>
          <p style={styles.description}>{c.description.slice(0, 100)}...</p>
          <p>
            Status:{' '}
            <span style={getStatusStyle(c.status)}>
              {c.status}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  title: {
    margin: 0,
    fontSize: '18px',
    color: '#2c3e50',
  },
  link: {
    textDecoration: 'none',
    color: '#2980b9',
  },
  description: {
    margin: '10px 0',
    color: '#555',
  }
};

export default ComplaintList;
