import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem('userRole');

  // If no role stored, redirect to login
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // If role not allowed for this route, redirect to home
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PrivateRoute;
