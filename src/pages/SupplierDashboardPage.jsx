import React from 'react';
import './SupplierDashboardPage.css';

const SupplierDashboardPage = () => {
  const kpiData = {
    totalMaterials: 12,
    pendingOrders: 5,
    completedOrders: 20,
    lowStockAlerts: 2,
  };

  const financialSummary = {
    totalRevenue: '$25,000',
    pendingPayments: '$5,000',
    recentPayments: '$2,000',
  };

  const recentOrders = [
    { id: 101, manufacturer: 'ABC Pvt Ltd', material: 'Steel', quantity: 50, status: 'Pending', paymentStatus: 'Pending', shipmentStatus: 'Not Shipped', date: '2025-01-05', completionDate: '-' },
    { id: 102, manufacturer: 'XYZ Ltd', material: 'Copper', quantity: 30, status: 'Completed', paymentStatus: 'Completed', shipmentStatus: 'Shipped', date: '2025-01-04', completionDate: '2025-01-06' },
    { id: 103, manufacturer: 'LMN Co.', material: 'Aluminum', quantity: 70, status: 'In Progress', paymentStatus: 'In Progress', shipmentStatus: 'In Transit', date: '2025-01-03', completionDate: '-' },
  ];

  const inventoryOverview = [
    { material: 'Steel', quantity: 100, unit: 'tons' },
    { material: 'Copper', quantity: 75, unit: 'tons' },
    { material: 'Aluminum', quantity: 50, unit: 'tons' },
  ];

  return (
    <div className="supplier-dashboard-page">
      {/* KPI Cards */}
      <div className="kpi-cards">
        {Object.entries(kpiData).map(([key, value]) => (
          <div key={key} className="kpi-card">
            <h3>{value}</h3>
            <p>{key.replace(/([A-Z])/g, ' $1')}</p>
          </div>
        ))}
      </div>

      {/* Financial Summary */}
      <div className="financial-summary">
        <h2>Financial Summary</h2>
        <div className="summary-cards">
          {Object.entries(financialSummary).map(([key, value]) => (
            <div key={key} className="summary-card">
              <h4>{key.replace(/([A-Z])/g, ' $1')}</h4>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Inventory Overview */}
      <div className="inventory-overview">
        <h2>Inventory Overview</h2>
        <table>
          <thead>
            <tr>
              <th>Material</th>
              <th>Quantity</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {inventoryOverview.map((item, index) => (
              <tr key={index}>
                <td>{item.material}</td>
                <td>{item.quantity}</td>
                <td>{item.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Orders */}
      <div className="recent-orders">
        <h2>Recent Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Manufacturer</th>
              <th>Raw Material</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Payment Status</th>
              <th>Shipment Status</th>
              <th>Order Date</th>
              <th>Completion Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.manufacturer}</td>
                <td>{order.material}</td>
                <td>{order.quantity}</td>
                <td>{order.status}</td>
                <td>{order.paymentStatus}</td>
                <td>{order.shipmentStatus}</td>
                <td>{order.date}</td>
                <td>{order.completionDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierDashboardPage;