import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, role })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      setSuccess(true);
      alert("📧 Verification email sent! Please check your inbox.");
      navigate('/login');
    } catch (err) {
      setError(err.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
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
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />

        <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.input}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        {error && <p style={styles.error}>{error}</p>}
        {loading && <p style={styles.loading}>Signing up...</p>}
        {success && <p style={styles.success}>Verification email sent!</p>}

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Please wait...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    height: '100vh', backgroundColor: '#e0f7fa',
  },
  form: {
    backgroundColor: '#fff', padding: '40px', borderRadius: '12px',
    boxShadow: '0 6px 15px rgba(0,0,0,0.1)', width: '90%', maxWidth: '400px',
  },
  title: {
    textAlign: 'center', marginBottom: '20px', color: '#00796b',
  },
  input: {
    width: '100%', padding: '10px', marginBottom: '15px',
    borderRadius: '8px', border: '1px solid #ccc',
  },
  button: {
    width: '100%', padding: '10px', backgroundColor: '#00796b',
    color: '#fff', border: 'none', borderRadius: '8px',
    fontSize: '16px', cursor: 'pointer',
  },
  error: {
    color: 'red', textAlign: 'center', marginBottom: '10px',
  },
  loading: {
    color: '#555', textAlign: 'center', marginBottom: '10px',
  },
  success: {
    color: 'green', textAlign: 'center', marginBottom: '10px',
  },
};

export default SignUpPage;
