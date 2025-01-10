import React, { useState } from 'react';
import './ManufacturerSalesPage.css';

const ManufacturerSalesPage = () => {
  const mockOrders = [
    { id: 1, productName: 'Steel Rod', quantity: 100, availableStock: 500, pricePerUnit: 50, totalAmount: 5000, middlemenName: 'XYZ Corp', contact: '9876543210', orderDate: '2025-01-01', status: 'Pending', paymentStatus: 'Pending' },
    { id: 2, productName: 'Copper Sheet', quantity: 200, availableStock: 300, pricePerUnit: 70, totalAmount: 14000, middlemenName: 'ABC Ltd', contact: '9876543211', orderDate: '2025-01-02', status: 'Accepted', paymentStatus: 'Completed' },
    { id: 3, productName: 'Aluminum Plate', quantity: 50, availableStock: 50, pricePerUnit: 30, totalAmount: 1500, middlemenName: 'LMN Pvt Ltd', contact: '9876543212', orderDate: '2025-01-03', status: 'Rejected', paymentStatus: 'Pending' },
  ];

  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Handle search
  const handleSearch = (e) => setSearchTerm(e.target.value);

  // Handle status filter
  const handleStatusFilter = (e) => setStatusFilter(e.target.value);

  // Handle sorting
  const handleSort = (key) => {
    setSortKey(key);
    const sortedOrders = [...orders].sort((a, b) => (a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0));
    setOrders(sortedOrders);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Handle accept order
  const handleAcceptOrder = (orderId) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: 'Accepted' } : order)));
  };

  // Handle reject order
  const handleRejectOrder = (orderId) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: 'Rejected' } : order)));
  };

  return (
    <div className="manufacturer-sales-page">
      <h2>View Sales Orders</h2>

      {/* Search, Filter, and Sort Controls */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by middlemen or product..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select onChange={handleStatusFilter} value={statusFilter}>
          <option value="">Filter by Status</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button onClick={() => handleSort('orderDate')}>Sort by Date</button>
        <button onClick={() => handleSort('middlemenName')}>Sort by Middlemen</button>
      </div>

      {/* Orders Table */}
      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Available Stock</th>
              <th>Price/Unit</th>
              <th>Total Amount</th>
              <th>Middlemen Name</th>
              <th>Contact</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders
              .filter(
                (order) =>
                  order.middlemenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  order.productName.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .filter((order) => (statusFilter ? order.status === statusFilter : true))
              .map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.productName}</td>
                  <td>{order.quantity}</td>
                  <td>{order.availableStock}</td>
                  <td>${order.pricePerUnit}</td>
                  <td>${order.totalAmount}</td>
                  <td>{order.middlemenName}</td>
                  <td>{order.contact}</td>
                  <td>{order.orderDate}</td>
                  <td>
                    <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
                  </td>
                  <td>{order.paymentStatus}</td>
                  <td>
                    <button
                      disabled={order.status !== 'Pending' || order.quantity > order.availableStock}
                      onClick={() => handleAcceptOrder(order.id)}
                    >
                      Accept
                    </button>
                    <button
                      disabled={order.status !== 'Pending'}
                      onClick={() => handleRejectOrder(order.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManufacturerSalesPage;
