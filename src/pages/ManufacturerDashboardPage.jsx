import React from 'react';
import './ManufacturerDashboardPage.css';

const ManufacturerDashboardPage = () => {
  // Mock data for KPI cards
  const kpiData = {
    totalProcurementOrders: 25,
    totalSaleOrders: 18,
    pendingProcurementOrders: 5,
    pendingSaleOrders: 3,
    warehouseCapacity: 1000, // in units
    currentUsage: 750, // in units
  };

  // Mock data for recent activities
  const recentProcurementOrders = [
    { id: 101, material: 'Steel', quantity: 100, supplier: 'ABC Pvt Ltd', status: 'Pending', date: '2025-01-03' },
    { id: 102, material: 'Copper', quantity: 75, supplier: 'XYZ Ltd', status: 'Completed', date: '2025-01-02' },
    { id: 103, material: 'Aluminum', quantity: 50, supplier: 'LMN Co.', status: 'In Progress', date: '2025-01-01' },
  ];

  const recentSaleOrders = [
    { id: 201, product: 'Steel Rods', quantity: 50, middleman: 'PQR Traders', status: 'Pending', date: '2025-01-04' },
    { id: 202, product: 'Copper Sheets', quantity: 30, middleman: 'DEF Distributors', status: 'Completed', date: '2025-01-03' },
    { id: 203, product: 'Aluminum Bars', quantity: 20, middleman: 'GHI Wholesalers', status: 'In Progress', date: '2025-01-02' },
  ];

  // Calculate warehouse usage percentage
  const warehouseUsagePercentage = ((kpiData.currentUsage / kpiData.warehouseCapacity) * 100).toFixed(1);

  // Function to get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'status-badge completed';
      case 'In Progress':
        return 'status-badge in-progress';
      case 'Pending':
        return 'status-badge pending';
      default:
        return 'status-badge';
    }
  };

  return (
    <div className="manufacturer-dashboard-page">
      <h2>Manufacturer Dashboard</h2>

      {/* KPI Cards Section */}
      <div className="kpi-cards">
        <div className="kpi-card">
          <h3>{kpiData.totalProcurementOrders}</h3>
          <p>Total Procurement Orders</p>
        </div>
        <div className="kpi-card">
          <h3>{kpiData.totalSaleOrders}</h3>
          <p>Total Sale Orders</p>
        </div>
        <div className="kpi-card">
          <h3>{kpiData.pendingProcurementOrders}</h3>
          <p>Pending Procurement Orders</p>
        </div>
        <div className="kpi-card">
          <h3>{kpiData.pendingSaleOrders}</h3>
          <p>Pending Sale Orders</p>
        </div>
        <div className="kpi-card warehouse-card">
          <h3>{warehouseUsagePercentage}%</h3>
          <p>Warehouse Capacity Used</p>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="recent-activities">
        <div className="recent-section">
          <h3>Recent Procurement Orders</h3>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Material</th>
                <th>Quantity</th>
                <th>Supplier</th>
                <th>Status</th>
                <th>Order Date</th>
              </tr>
            </thead>
            <tbody>
              {recentProcurementOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.material}</td>
                  <td>{order.quantity}</td>
                  <td>{order.supplier}</td>
                  <td>
                    <span className={getStatusBadgeClass(order.status)}>{order.status}</span>
                  </td>
                  <td>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="recent-section">
          <h3>Recent Sale Orders</h3>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Middleman</th>
                <th>Status</th>
                <th>Order Date</th>
              </tr>
            </thead>
            <tbody>
              {recentSaleOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.product}</td>
                  <td>{order.quantity}</td>
                  <td>{order.middleman}</td>
                  <td>
                    <span className={getStatusBadgeClass(order.status)}>{order.status}</span>
                  </td>
                  <td>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManufacturerDashboardPage;
