import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import StudentPage from './pages/StudentPage';
import AdminPage from './pages/AdminPage';

import PrivateRoute from './components/PrivateRoute';

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
              <StudentPage />
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
