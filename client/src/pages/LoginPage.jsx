import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthPage.css';
import { FaUser, FaLock } from 'react-icons/fa';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response && err.response.data.message
        ? err.response.data.message
        : err.message);
    }
  };

  return (
    <div className="auth-container gradient-bg">
      <form className="auth-form glass-effect" onSubmit={handleSubmit}>
        <div className="icon-circle">
          <FaUser size={40} color="#00796b" />
        </div>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <div className="input-icon-group">
            <FaUser className="input-icon" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="input-icon-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
        </div>
        <button type="submit" className="btn primary">Login</button>
        <p className="auth-switch">Don't have an account? <a href="/signup">Sign Up</a></p>
      </form>
    </div>
  );
}

export default LoginPage;