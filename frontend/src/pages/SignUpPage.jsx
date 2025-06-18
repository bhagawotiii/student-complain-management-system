import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // Save new user data locally (for now)
    localStorage.setItem('userRole', role);
    localStorage.setItem('username', username);

    // Redirect to login or home
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSignup} style={styles.form}>
        <h2 style={styles.title}>📝 Sign Up</h2>

        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.input}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#e0f7fa',
  },
  form: {
    backgroundColor: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 6px 15px rgba(0,0,0,0.1)', width: '90%', maxWidth: '400px',
  },
  title: {
    textAlign: 'center', marginBottom: '20px', color: '#00796b',
  },
  input: {
    width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ccc',
  },
  button: {
    width: '100%', padding: '10px', backgroundColor: '#00796b', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer',
  },
};

export default SignUpPage;
