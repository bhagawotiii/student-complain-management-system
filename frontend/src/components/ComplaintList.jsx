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

  return (
    <div>
      <h3>Complaint List</h3>
      <ul>
        {complaints.map(c => (
          <li key={c.id}>
            <Link to={`/complaints/${c.id}`}>{c.title}</Link>
            {userType === 'admin' && <span> - Status: {c.status}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComplaintList;
