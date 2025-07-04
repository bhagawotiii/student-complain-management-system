import React, { useEffect, useState } from 'react';

const ComplaintHistory = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/complaints');
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

  return (
    <div style={{ padding: '20px' }}>
      <h2>Complaint History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Address</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Details</th>
                <th style={thStyle}>File</th>
                <th style={thStyle}>Date</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c._id}>
                  <td style={tdStyle}>{c.name}</td>
                  <td style={tdStyle}>{c.address}</td>
                  <td style={tdStyle}>{c.category}</td>
                  <td style={tdStyle}>{c.details}</td>
                  <td style={tdStyle}>
                    {c.filePath ? (
                      <a href={`http://localhost:5000/${c.filePath.replace('\\', '/')}`} target="_blank" rel="noopener noreferrer">View</a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td style={tdStyle}>{new Date(c.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const thStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  background: '#f0f4f8',
  fontWeight: 'bold',
};
const tdStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  background: '#fff',
};

export default ComplaintHistory; 