import React, { useState } from 'react';
import './SupplierOrdersPage.css';

const SupplierOrdersPage = () => {
  const mockOrders = [
    {
      id: 101,
      manufacturer: 'ABC Pvt Ltd',
      material: 'Steel',
      quantity: 50,
      pricePerUnit: 100,
      status: 'Pending',
      paymentStatus: 'Pending',
      collected: false,
      date: '2025-01-05',
      completionDate: '-',
      deliveryPickupDate: '2025-01-10 10:00 AM',
      paymentReceivedDate: '-',
      manufacturerDetails: 'ABC Pvt Ltd, 123 Industrial Park, City A',
    },
    {
      id: 102,
      manufacturer: 'XYZ Ltd',
      material: 'Copper',
      quantity: 30,
      pricePerUnit: 200,
      status: 'In Progress',
      paymentStatus: 'Completed',
      collected: false,
      date: '2025-01-04',
      completionDate: '-',
      deliveryPickupDate: '2025-01-09 02:00 PM',
      paymentReceivedDate: '2025-01-05',
      manufacturerDetails: 'XYZ Ltd, 456 Business Hub, City B',
    },
    {
      id: 103,
      manufacturer: 'LMN Co.',
      material: 'Aluminum',
      quantity: 70,
      pricePerUnit: 150,
      status: 'Completed',
      paymentStatus: 'Completed',
      collected: true,
      date: '2025-01-03',
      completionDate: '2025-01-06',
      deliveryPickupDate: '2025-01-08 04:00 PM',
      paymentReceivedDate: '2025-01-04',
      manufacturerDetails: 'LMN Co., 789 Commercial Zone, City C',
    },
    {
      id: 104,
      manufacturer: 'DEF Industries',
      material: 'Plastic',
      quantity: 40,
      pricePerUnit: 50,
      status: 'Cancelled',
      paymentStatus: 'Not Applicable',
      collected: false,
      date: '2025-01-02',
      completionDate: '-',
      deliveryPickupDate: '-',
      paymentReceivedDate: '-',
      manufacturerDetails: 'DEF Industries, 999 Industrial Estate, City D',
    },
  ];

  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
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

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="supplier-orders-page">
      <h2>Orders Management</h2>

      {/* Search, Filter, and Sort */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by manufacturer or material..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select onChange={handleStatusFilter} value={statusFilter}>
          <option value="">Filter by Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button onClick={() => handleSort('date')}>Sort by Date</button>
        <button onClick={() => handleSort('manufacturer')}>Sort by Manufacturer</button>
      </div>

      {/* Orders Table */}
      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Manufacturer</th>
              <th>Raw Material</th>
              <th>Quantity</th>
              <th>Total Price</th>
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
              .filter(
                (order) =>
                  order.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  order.material.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .filter((order) => (statusFilter ? order.status === statusFilter : true))
              .map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.manufacturer}</td>
                  <td>{order.material}</td>
                  <td>{order.quantity}</td>
                  <td>${order.quantity * order.pricePerUnit}</td>
                  <td>{order.status}</td>
                  <td>{order.paymentStatus}</td>
                  <td>{order.collected ? 'Yes' : 'No'}</td>
                  <td>{order.date}</td>
                  <td>{order.completionDate}</td>
                  <td>
                    <button className="view-details-button">View More Details</button>
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

export default SupplierOrdersPage;