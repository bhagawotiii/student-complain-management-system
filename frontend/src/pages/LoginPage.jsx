import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });
      const { role, username: user, token } = response.data;
      localStorage.setItem('userRole', role);
      localStorage.setItem('username', user);
      localStorage.setItem('token', token);
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/student');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid username or password');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>🔐 Login</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

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

        <button type="submit" style={styles.button}>Login</button>

        <p style={styles.signupText}>
          Don't have an account? <Link to="/signup" style={styles.link}>Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f4f8',
  },
  form: {
    backgroundColor: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 6px 15px rgba(0,0,0,0.1)', width: '90%', maxWidth: '400px',
  },
  title: {
    textAlign: 'center', marginBottom: '20px', color: '#1e3a8a',
  },
  input: {
    width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ccc',
  },
  button: {
    width: '100%', padding: '10px', backgroundColor: '#1e3a8a', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer',
  },
  signupText: {
    textAlign: 'center',
    marginTop: '15px',
    fontSize: '14px',
  },
  link: {
    color: '#1e3a8a',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};

export default LoginPage;
