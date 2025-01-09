import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './ManufacturerDashboard.css';

const ManufacturerDashboard = () => {
  return (
    <div className="manufacturer-dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Manufacturer Dashboard</h1>
        <div className="profile-menu">
          <span>Profile</span>
          <span>Logout</span>
        </div>
      </header>

      {/* Sidebar and Main Content */}
      <div className="dashboard-content-wrapper">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <ul>
            <li>
              <Link to="/manufacturer/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/manufacturer/place-order">Place New Order</Link>
            </li>
            <li>
              <Link to="/manufacturer/procurement-orders">Procurement Orders</Link>
            </li>
            <li>
              <Link to="/manufacturer/create-sale-order">Create Sale Order</Link>
            </li>
            <li>
              <Link to="/manufacturer/sales">View Sale Orders</Link>
            </li>
            <li>
              <Link to="/manufacturer/warehouse">Warehouse Management</Link>
            </li>
            <li>
              <Link to="/manufacturer/track-orders">Track Orders</Link>
            </li>
            <li>
              <Link to="/manufacturer/analytics">Analytics</Link>
            </li>
            <li>
              <Link to="/manufacturer/notifications">Notifications</Link>
            </li>
            <li>
              <Link to="/manufacturer/profile">Profile</Link>
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

export default ManufacturerDashboard;
