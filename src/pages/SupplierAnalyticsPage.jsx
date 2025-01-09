import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement } from 'chart.js';
import './SupplierAnalyticsPage.css';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement);

// Mock data for charts
const stockData = {
  labels: ['Steel', 'Copper', 'Wood', 'Aluminum', 'Plastic'],
  datasets: [
    {
      label: 'Stock Quantity',
      data: [100, 75, 200, 50, 150],
      backgroundColor: ['#007bff', '#28a745', '#ffc107', '#17a2b8', '#dc3545'],
    },
  ],
};

const orderStatusData = {
  labels: ['Pending', 'In Progress', 'Completed'],
  datasets: [
    {
      label: 'Order Status',
      data: [5, 3, 20],
      backgroundColor: ['#ffc107', '#17a2b8', '#28a745'],
    },
  ],
};

const revenueData = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Monthly Revenue',
      data: [5000, 7000, 4000, 6000, 8000],
      borderColor: '#007bff',
      fill: false,
    },
  ],
};

// Mock data for top customers
const topCustomers = [
  { name: 'ABC Pvt Ltd', orders: 15, revenue: 50000 },
  { name: 'XYZ Ltd', orders: 12, revenue: 42000 },
  { name: 'LMN Co.', orders: 10, revenue: 35000 },
];

const SupplierAnalyticsPage = () => {
  return (
    <div className="supplier-analytics-page">
      <h2>Supplier Analytics</h2>

      {/* Grid layout for charts and top customers */}
      <div className="charts-grid">
        {/* Stock Level Bar Chart */}
        <div className="chart-card">
          <h3>Stock Levels</h3>
          <Bar data={stockData} options={{ maintainAspectRatio: false }} />
        </div>

        {/* Order Status Pie Chart */}
        <div className="chart-card">
          <h3>Order Status Breakdown</h3>
          <Pie data={orderStatusData} options={{ maintainAspectRatio: false }} />
        </div>

        {/* Monthly Revenue Line Chart */}
        <div className="chart-card">
          <h3>Monthly Revenue</h3>
          <Line data={revenueData} options={{ maintainAspectRatio: false }} />
        </div>

        {/* Top Customers Section */}
        <div className="chart-card">
          <h3>Top Customers</h3>
          <ul className="top-customers-list">
            {topCustomers.map((customer, index) => (
              <li key={index}>
                <strong>{customer.name}</strong>: {customer.orders} orders, ${customer.revenue} revenue
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SupplierAnalyticsPage;
