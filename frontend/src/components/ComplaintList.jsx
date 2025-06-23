// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import AdminPage from '../pages/AdminPage';
import StudentDashboardPage from '../pages/StudentDashboardPage';

import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />

        {/* Home available to all logged-in */}
        <Route
          path="/home"
          element={
            <PrivateRoute allowedRoles={['student', 'admin']}>
              <HomePage />
            </PrivateRoute>
          }
        />

        {/* Student-only route */}
        <Route
          path="/student"
          element={
            <PrivateRoute allowedRoles={['student']}>
              <StudentDashboardPage />
            </PrivateRoute>
          }
        />

        {/* Admin-only route */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminPage />
            </PrivateRoute>
          }
        />

        {/* Redirect all other routes to login */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
