import React from 'react';
import ComplaintList from '../components/ComplaintList';

const AdminPage = () => (
  <div>
    <h2>Admin Dashboard</h2>
    <ComplaintList userType="admin" />
  </div>
);

export default AdminPage;
