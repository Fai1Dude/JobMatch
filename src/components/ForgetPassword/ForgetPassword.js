// src/ForgetPassword.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ForgetPassword.css';
import logo from '../../assets/logo.png';

function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset email sent. Please check your inbox.');
        setEmail('');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Server error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forget-password-container">
      <div className="logo">
        <img src={logo} alt="JobMatch Logo" className="logo-forget" />
      </div>
      <h2>Reset Password</h2>
      <p className="instruction">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      <form onSubmit={handleSubmit} className="reset-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <div className="button-group">
          <button 
            type="button" 
            className="cancel-button" 
            onClick={() => navigate('/login')}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="reset-button"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Reset Password'}
          </button>
        </div>
      </form>
      <p>
        New to Job Match? <Link to="/register">Join now</Link>
      </p>
    </div>
  );
}

export default ForgetPassword;