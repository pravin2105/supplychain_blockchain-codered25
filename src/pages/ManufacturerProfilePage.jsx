import React, { useState } from 'react';
import './ManufacturerProfilePage.css';

const ManufacturerProfilePage = () => {
  const [viewMode, setViewMode] = useState(true);
  const [profileData, setProfileData] = useState({
    name: 'Ashwin Manufacturer',
    email: 'ashwin@manufacturer.com',
    licenseNumber: 'LIC123456',
    companyName: 'Ashwin Industries',
  });

  const [bankingData, setBankingData] = useState({
    bankName: 'State Bank of India',
    accountNumber: '123456789012',
    ifscCode: 'SBIN0001234',
    branch: 'Chennai Main',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleBankingChange = (e) => {
    setBankingData({ ...bankingData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log('Profile saved:', profileData);
    console.log('Banking details saved:', bankingData);
    setViewMode(true);
  };

  const handleCancel = () => {
    setViewMode(true);
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    console.log('Password changed:', passwordData);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="profile-page-container">
      <h2>Manufacturer Profile</h2>
      <div className="profile-card">
        {viewMode ? (
          <div className="profile-display">
            <p><strong>Name:</strong> {profileData.name}</p>
            <p><strong>Email:</strong> {profileData.email}</p>
            <p><strong>License Number:</strong> {profileData.licenseNumber}</p>
            <p><strong>Company Name:</strong> {profileData.companyName}</p>
            <h3>Banking Details</h3>
            <p><strong>Bank Name:</strong> {bankingData.bankName}</p>
            <p><strong>Account Number:</strong> {bankingData.accountNumber}</p>
            <p><strong>IFSC Code:</strong> {bankingData.ifscCode}</p>
            <p><strong>Branch:</strong> {bankingData.branch}</p>
            <button onClick={() => setViewMode(false)} className="edit-button">Edit Profile</button>
          </div>
        ) : (
          <div className="profile-edit-form">
            <div className="form-group">
              <label>Name:</label>
              <input type="text" name="name" value={profileData.name} onChange={handleProfileChange} />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" name="email" value={profileData.email} onChange={handleProfileChange} />
            </div>
            <div className="form-group">
              <label>License Number:</label>
              <input type="text" name="licenseNumber" value={profileData.licenseNumber} onChange={handleProfileChange} />
            </div>
            <div className="form-group">
              <label>Company Name:</label>
              <input type="text" name="companyName" value={profileData.companyName} onChange={handleProfileChange} />
            </div>

            <h3>Banking Details</h3>
            <div className="form-group">
              <label>Bank Name:</label>
              <input type="text" name="bankName" value={bankingData.bankName} onChange={handleBankingChange} />
            </div>
            <div className="form-group">
              <label>Account Number:</label>
              <input type="text" name="accountNumber" value={bankingData.accountNumber} onChange={handleBankingChange} />
            </div>
            <div className="form-group">
              <label>IFSC Code:</label>
              <input type="text" name="ifscCode" value={bankingData.ifscCode} onChange={handleBankingChange} />
            </div>
            <div className="form-group">
              <label>Branch:</label>
              <input type="text" name="branch" value={bankingData.branch} onChange={handleBankingChange} />
            </div>

            <button onClick={handleSave} className="save-button">Save</button>
            <button onClick={handleCancel} className="cancel-button">Cancel</button>
          </div>
        )}
      </div>

      <div className="password-change-section">
        <h3>Change Password</h3>
        <div className="form-group">
          <label>Current Password:</label>
          <input
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="form-group">
          <label>Confirm New Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
          />
        </div>
        <button onClick={handleChangePassword} className="change-password-button">Change Password</button>
      </div>
    </div>
  );
};

export default ManufacturerProfilePage;
