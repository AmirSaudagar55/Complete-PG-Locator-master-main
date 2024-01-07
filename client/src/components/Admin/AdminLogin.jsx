import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPage from './AdminPage';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false); // New state variable for error
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Simulated authentication logic
    const isAdminAuthenticated = username === 'admin' && password === 'adminpassword';

    if (isAdminAuthenticated) {
      // Update login status
      setLoggedIn(true);
      setError(false); // Reset error state on successful login
      // Redirect to the Admin component after successful login
      // navigate('/admin');
    } else {
      setError(true); // Set error state on failed login
      console.log('Admin login failed. Invalid credentials.');
    }
  };

  if (isLoggedIn) {
    return <AdminPage />;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ background: '#fff', padding: '16px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '8px', width: '300px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', color: '#4B5563' }}>Username:</label>
            <input
              type="text"
              style={{ marginTop: '0.25rem', padding: '0.5rem', border: '1px solid #E5E7EB', borderRadius: '4px', width: '100%' }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', color: '#4B5563' }}>Password:</label>
            <input
              type="password"
              style={{ marginTop: '0.25rem', padding: '0.5rem', border: '1px solid #E5E7EB', borderRadius: '4px', width: '100%' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <p style={{ fontSize: '0.875rem', color: '#EF4444', marginBottom: '1rem' }}>
              Invalid credentials. Please try again.
            </p>
          )}
          <button
            type="submit"
            style={{
              backgroundColor: '#3490DC',
              color: '#fff',
              padding: '0.75rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
