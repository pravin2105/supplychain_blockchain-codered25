import React, { useState } from 'react';
import './SignupPage.css';

const SignupPage = () => {
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    licenseNumber: '',
    vehicleDetails: '',
  });

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      licenseNumber: '',
      vehicleDetails: '',
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation and submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="signup-container">
      <h2>Signup Page</h2>
      <div className="role-selection">
        <label htmlFor="role">Select Role:</label>
        <select id="role" value={role} onChange={handleRoleChange}>
          <option value="">-- Choose a Role --</option>
          <option value="supplier">Raw Material Supplier</option>
          <option value="manufacturer">Manufacturer</option>
          <option value="middlemen">Middlemen</option>
          <option value="logistics">Logistics Provider</option>
          <option value="customer">Customer</option>
        </select>
      </div>

      {role && (
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role-Specific Fields */}
          {role === 'supplier' && (
            <div className="form-group">
              <label htmlFor="companyName">Company Name:</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {role === 'manufacturer' && (
            <div className="form-group">
              <label htmlFor="licenseNumber">License Number:</label>
              <input
                type="text"
                id="licenseNumber"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {role === 'logistics' && (
            <div className="form-group">
              <label htmlFor="vehicleDetails">Vehicle Details:</label>
              <input
                type="text"
                id="vehicleDetails"
                name="vehicleDetails"
                value={formData.vehicleDetails}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button type="submit" className="submit-button">
            Signup
          </button>
        </form>
      )}
    </div>
  );
};

export default SignupPage;
