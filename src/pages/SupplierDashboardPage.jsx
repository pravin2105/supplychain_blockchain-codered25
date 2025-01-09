import React from 'react';
import './SupplierDashboardPage.css';

const SupplierDashboardPage = () => {
  // Mock data for key metrics and recent orders
  const kpiData = {
    totalMaterials: 12,
    pendingOrders: 5,
    completedOrders: 20,
    lowStockAlerts: 2,
  };

  const recentOrders = [
    {
      id: 101,
      manufacturer: 'ABC Pvt Ltd',
      material: 'Steel',
      quantity: 50,
      status: 'Pending',
      paymentStatus: 'Pending',
      shipmentStatus: 'Not Shipped',
      date: '2025-01-05',
      completionDate: '-',
    },
    {
      id: 102,
      manufacturer: 'XYZ Ltd',
      material: 'Copper',
      quantity: 30,
      status: 'Completed',
      paymentStatus: 'Completed',
      shipmentStatus: 'Shipped',
      date: '2025-01-04',
      completionDate: '2025-01-06',
    },
    {
      id: 103,
      manufacturer: 'LMN Co.',
      material: 'Aluminum',
      quantity: 70,
      status: 'In Progress',
      paymentStatus: 'In Progress',
      shipmentStatus: 'In Transit',
      date: '2025-01-03',
      completionDate: '-',
    },
  ];

  return (
    <div className="supplier-dashboard-page">
      {/* KPI Cards Section */}
      <div className="kpi-cards">
        <div className="kpi-card">
          <h3>{kpiData.totalMaterials}</h3>
          <p>Total Raw Materials</p>
        </div>
        <div className="kpi-card">
          <h3>{kpiData.pendingOrders}</h3>
          <p>Pending Orders</p>
        </div>
        <div className="kpi-card">
          <h3>{kpiData.completedOrders}</h3>
          <p>Completed Orders</p>
        </div>
        <div className="kpi-card">
          <h3>{kpiData.lowStockAlerts}</h3>
          <p>Low Stock Alerts</p>
        </div>
      </div>

      {/* Recent Orders Section */}
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
