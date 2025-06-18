import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage'; // 👈 import the SignUp page
import HomePage from './pages/HomePage';
import StudentPage from './pages/StudentPage';
import AdminPage from './pages/AdminPage';

import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} /> {/* 👈 add SignUp route */}

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute allowedRoles={['student', 'admin']}>
              <HomePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/student"
          element={
            <PrivateRoute allowedRoles={['student']}>
              <StudentPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminPage />
            </PrivateRoute>
          }
        />

        {/* Catch-all route: Redirect to login */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
