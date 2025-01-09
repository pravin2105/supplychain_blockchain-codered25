import React, { useState } from 'react';
import './SupplierProfilePage.css';

const SupplierProfilePage = () => {
  // Initial mock data for profile
  const [profile, setProfile] = useState({
    companyName: 'ABC Supplies Pvt Ltd',
    supplierName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '9876543210',
    address: '123, Industrial Area, City, Country',
  });

  const [bankDetails, setBankDetails] = useState({
    bankName: 'XYZ Bank',
    accountHolderName: 'John Doe',
    accountNumber: '1234567890',
    ifscCode: 'XYZB0001234',
  });

  const [editMode, setEditMode] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Handle profile input changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Handle bank details input changes
  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setBankDetails({ ...bankDetails, [name]: value });
  };

  // Handle password input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  // Save profile and bank details changes
  const handleSaveProfile = () => {
    setEditMode(false);
    alert('Profile and bank details updated successfully!');
  };

  // Change password
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }
    alert('Password changed successfully!');
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="supplier-profile-page">
      <h2>Profile Management</h2>

      {/* Profile Information Section */}
      <div className="profile-section">
        <h3>Profile Information</h3>
        <div className="profile-form">
          <div className="form-group">
            <label>Company Name:</label>
            <input
              type="text"
              name="companyName"
              value={profile.companyName}
              onChange={handleProfileChange}
              disabled={!editMode}
            />
          </div>
          <div className="form-group">
            <label>Supplier Name:</label>
            <input
              type="text"
              name="supplierName"
              value={profile.supplierName}
              onChange={handleProfileChange}
              disabled={!editMode}
            />
          </div>
          <div className="form-group">
            <label>Email Address:</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleProfileChange}
              disabled={!editMode}
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <textarea
              name="address"
              value={profile.address}
              onChange={handleProfileChange}
              disabled={!editMode}
            />
          </div>
        </div>
      </div>

      {/* Bank Account Details Section */}
      <div className="bank-details-section">
        <h3>Bank Account Details</h3>
        <div className="profile-form">
          <div className="form-group">
            <label>Bank Name:</label>
            <input
              type="text"
              name="bankName"
              value={bankDetails.bankName}
              onChange={handleBankDetailsChange}
              disabled={!editMode}
            />
          </div>
          <div className="form-group">
            <label>Account Holder Name:</label>
            <input
              type="text"
              name="accountHolderName"
              value={bankDetails.accountHolderName}
              onChange={handleBankDetailsChange}
              disabled={!editMode}
            />
          </div>
          <div className="form-group">
            <label>Account Number:</label>
            <input
              type="text"
              name="accountNumber"
              value={bankDetails.accountNumber}
              onChange={handleBankDetailsChange}
              disabled={!editMode}
            />
          </div>
          <div className="form-group">
            <label>IFSC Code:</label>
            <input
              type="text"
              name="ifscCode"
              value={bankDetails.ifscCode}
              onChange={handleBankDetailsChange}
              disabled={!editMode}
            />
          </div>
        </div>
        {!editMode ? (
          <button onClick={() => setEditMode(true)} className="edit-button">
            Edit Profile
          </button>
        ) : (
          <button onClick={handleSaveProfile} className="save-button">
            Save Changes
          </button>
        )}
      </div>

      {/* Change Password Section */}
      <div className="change-password-section">
        <h3>Change Password</h3>
        <form onSubmit={handleChangePassword}>
          <div className="form-group">
            <label>Current Password:</label>
            <input
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit" className="change-password-button">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupplierProfilePage;
