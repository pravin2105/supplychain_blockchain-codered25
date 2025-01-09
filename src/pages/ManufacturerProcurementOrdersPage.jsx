import React, { useState } from 'react';
import './ManufacturerProcurementOrdersPage.css';

const ManufacturerProcurementOrdersPage = () => {
  const mockOrders = [
    { id: 101, material: 'Steel', quantity: 100, supplier: 'ABC Pvt Ltd', status: 'Pending', paymentStatus: 'Pending', collected: false, orderDate: '2025-01-03', completionDate: '-' },
    { id: 102, material: 'Copper', quantity: 75, supplier: 'XYZ Ltd', status: 'In Progress', paymentStatus: 'Completed', collected: false, orderDate: '2025-01-02', completionDate: '-' },
    { id: 103, material: 'Aluminum', quantity: 50, supplier: 'LMN Co.', status: 'Completed', paymentStatus: 'Completed', collected: true, orderDate: '2025-01-01', completionDate: '2025-01-06' },
  ];

  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 5;

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle status filter
  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  // Handle sorting
  const handleSort = (key) => {
    setSortKey(key);
    const sortedOrders = [...orders].sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
    setOrders(sortedOrders);
  };

  // Handle opening the modal
  const handleViewMore = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="manufacturer-procurement-orders-page">
      <h2>View Procurement Orders</h2>

      {/* Search, Filter, and Sort */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by supplier or material..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select onChange={handleStatusFilter} value={statusFilter}>
          <option value="">Filter by Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button onClick={() => handleSort('orderDate')}>Sort by Date</button>
        <button onClick={() => handleSort('supplier')}>Sort by Supplier</button>
      </div>

      {/* Orders Table */}
      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Material</th>
              <th>Quantity</th>
              <th>Supplier</th>
              <th>Status</th>
              <th>Payment Status</th>
              <th>Collected</th>
              <th>Order Date</th>
              <th>Completion Date</th>
              <th>More Information</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders
              .filter((order) =>
                order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.material.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .filter((order) => (statusFilter ? order.status === statusFilter : true))
              .map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.material}</td>
                  <td>{order.quantity}</td>
                  <td>{order.supplier}</td>
                  <td>
                    <span className={`status ${order.status.toLowerCase().replace(' ', '-')}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.paymentStatus}</td>
                  <td>{order.collected ? 'Yes' : 'No'}</td>
                  <td>{order.orderDate}</td>
                  <td>{order.completionDate}</td>
                  <td>
                    <button onClick={() => handleViewMore(order)}>View More Details</button>
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

      {/* Modal for Order Details */}
      {showModal && selectedOrder && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Order Details (ID: {selectedOrder.id})</h3>
            <p><strong>Material:</strong> {selectedOrder.material}</p>
            <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
            <p><strong>Supplier:</strong> {selectedOrder.supplier}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
            <p><strong>Collected:</strong> {selectedOrder.collected ? 'Yes' : 'No'}</p>
            <p><strong>Order Date:</strong> {selectedOrder.orderDate}</p>
            <p><strong>Completion Date:</strong> {selectedOrder.completionDate}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManufacturerProcurementOrdersPage;
