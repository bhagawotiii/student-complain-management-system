import React from 'react';
import ComplaintForm from '../components/ComplaintForm';
import ComplaintList from '../components/ComplaintList';

const StudentPage = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🎓 Student Dashboard</h2>

      <div style={styles.section}>
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>📄 Submit New Complaint</h3>
          <ComplaintForm />
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>📋 Your Complaints</h3>
          <ComplaintList userType="student" />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px 20px',
    backgroundColor: '#f4f6f8',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    textAlign: 'center',
    fontSize: '28px',
    color: '#2c3e50',
    marginBottom: '30px',
  },
  section: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    width: '90%',
    maxWidth: '800px',
  },
  sectionTitle: {
    fontSize: '20px',
    color: '#34495e',
    marginBottom: '20px',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
  }
};

export default StudentPage;
