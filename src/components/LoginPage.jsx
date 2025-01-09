import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple validation
    if (!role || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    // Redirect to respective dashboard based on role
    switch (role) {
      case 'supplier':
        navigate('/supplier/dashboard');
        break;
      case 'manufacturer':
        navigate('/manufacturer/dashboard');
        break;
      case 'middlemen':
        navigate('/middlemen/dashboard');
        break;
      case 'logistics':
        navigate('/logistics/dashboard');
        break;
      case 'customer':
        navigate('/customer/dashboard');
        break;
      default:
        alert('Invalid role selected.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <form onSubmit={handleLogin} className="login-form">
        {/* Role Selection */}
        <div className="form-group">
          <label htmlFor="role">Select Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">-- Choose a Role --</option>
            <option value="supplier">Raw Material Supplier</option>
            <option value="manufacturer">Manufacturer</option>
            <option value="middlemen">Middlemen</option>
            <option value="logistics">Logistics Provider</option>
            <option value="customer">Customer</option>
          </select>
        </div>

        {/* Email Input */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
