import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './SupplierDashboard.css';

const SupplierDashboard = () => {
  return (
    <div className="supplier-dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Supplier Dashboard</h1>
        <div className="profile-menu">
          <Link to="/supplier/profile">Profile</Link>
          <Link to="/">Logout</Link>
        </div>
      </header>

      {/* Sidebar and Main Content */}
      <div className="dashboard-content-wrapper">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <ul>
            <li>
              <Link to="/supplier/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/supplier/materials">Raw Materials</Link>
            </li>
            <li>
              <Link to="/supplier/orders">Orders</Link>
            </li>
            <li>
              <Link to="/supplier/analytics">Analytics</Link>
            </li>
            <li>
              <Link to="/supplier/notifications">Notifications</Link>
            </li>
            <li>
              <Link to="/supplier/profile">Profile</Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SupplierDashboard;
