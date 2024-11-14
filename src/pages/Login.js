import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Replace with actual API call for authentication
    const role = await fetchUserRole(username, password);

    // Route based on user role
    if (role === 'patient') {
      navigate('/home-patient');
    } else if (role === 'doctor') {
      navigate('/home-doctor');
    } else if (role === 'admin') {
      navigate('/home-admin');
    } else {
      alert('Invalid username or password');
    }
  };

  // Simulated API call for authentication (replace with actual backend call)
  const fetchUserRole = async (username, password) => {
    // Placeholder logic for demonstration
    if (username === 'patient' && password === '1234') return 'patient';
    if (username === 'doctor' && password === '1234') return 'doctor';
    if (username === 'admin' && password === '1234') return 'admin';
    return null;
  };

  return (
    <div className="login-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ padding: '8px', margin: '8px 0' }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '8px', margin: '8px 0' }}
          />
        </label>
        <button type="submit" style={{ padding: '10px', marginTop: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
