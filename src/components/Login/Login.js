// src/components/Login/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../assets/logo.png';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userType', data.userType);
        localStorage.setItem('userId', data.userId);

        // Redirect based on user type
        switch (data.userType) {
          case 'admin':
            navigate('/ADashboardContent');
            break;
          case 'jobseeker':
            navigate('/JBDashboardContent');
            break;
          case 'employee':
            navigate('/EDashboardContent');
            break;
          default:
            setError('Invalid user type');
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Server error. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="logo">
          <img src={logo} alt="JobMatch Logo" className="logo-login" />
        </div>
        <div className="login-text">
          <h2>Login</h2>
        </div>
        <p className="subtitle">
          Don't miss your next opportunity. Sign in to stay updated<br />
          on your professional world.
        </p>
        <form className="login-form" onSubmit={handleLogin}>
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
          <input 
            type="password"
            name="password" 
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required 
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="signin-button">Sign In</button>
        </form>
        <p className="forgot-password">
          <Link to="/forget-password">Forgot password?</Link>
        </p>
        <p className="signup-text">
          New to Job Match? <Link to="/register">Join now</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
