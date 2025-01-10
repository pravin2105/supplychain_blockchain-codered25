import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './SupplierAnalyticsPage.css';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement, ChartDataLabels);

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

const pieChartOptions = {
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
      color: '#fff',
      font: {
        weight: 'bold',
        size: 14,
      },
      formatter: (value, context) => {
        const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
        const percentage = ((value / total) * 100).toFixed(1);
        return `${percentage}%`;
      },
    },
  },
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

const topCustomers = [
  { name: 'ABC Pvt Ltd', orders: 15, revenue: 50000 },
  { name: 'XYZ Ltd', orders: 12, revenue: 42000 },
  { name: 'LMN Co.', orders: 10, revenue: 35000 },
];

const topCustomersData = {
  labels: topCustomers.map((customer) => customer.name),
  datasets: [
    {
      label: 'Number of Orders',
      data: topCustomers.map((customer) => customer.orders),
      backgroundColor: '#007bff',
    },
  ],
};

const barChartOptions = {
  maintainAspectRatio: false,
  indexAxis: 'y', // Horizontal bar chart
  scales: {
    x: {
      beginAtZero: true,
    },
  },
};

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
          <Pie data={orderStatusData} options={pieChartOptions} />
        </div>

        {/* Monthly Revenue Line Chart */}
        <div className="chart-card">
          <h3>Monthly Revenue</h3>
          <Line data={revenueData} options={{ maintainAspectRatio: false }} />
        </div>

        {/* Top Customers Section */}
        <div className="chart-card">
          <h3>Top Customers (Orders)</h3>
          <Bar data={topCustomersData} options={barChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default SupplierAnalyticsPage;
