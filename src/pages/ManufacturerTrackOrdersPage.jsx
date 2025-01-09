import React, { useState } from 'react';
import './ManufacturerTrackOrdersPage.css';

const mockOrders = [
  {
    trackingId: 'TRACK12345',
    status: 'Delivered',
    progress: ['Order Booked', 'In Transit', 'Out for Delivery', 'Delivered'],
    orderDetails: {
      orderId: 'ORD101',
      orderDate: '2025-01-02',
      supplier: 'ABC Pvt Ltd',
      paymentMode: 'COD',
      totalAmount: 5000,
    },
    items: [
      { name: 'Steel Rods', quantity: 50, price: 100 },
      { name: 'Copper Sheets', quantity: 20, price: 75 },
    ],
    trackingHistory: [
      { date: '2025-01-01', time: '10:00 AM', location: 'Warehouse', event: 'Order Placed' },
      { date: '2025-01-02', time: '02:00 PM', location: 'Warehouse', event: 'Dispatched' },
      { date: '2025-01-03', time: '09:30 AM', location: 'City Hub', event: 'Out for Delivery' },
      { date: '2025-01-03', time: '04:00 PM', location: 'Customer Location', event: 'Delivered' },
    ],
  },
];

const ManufacturerTrackOrdersPage = () => {
  const [trackingId, setTrackingId] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Handle search for tracking ID
  const handleSearch = () => {
    const foundOrder = mockOrders.find((order) => order.trackingId === trackingId);
    if (foundOrder) {
      setOrderData(foundOrder);
      setShowModal(true);
    } else {
      alert('Tracking ID not found!');
    }
  };

  // Handle close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setOrderData(null);
    setTrackingId('');
  };

  return (
    <div className="manufacturer-track-orders-page">
      <h2>Track Your Order</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Modal Popup for Order Details */}
      {showModal && orderData && (
        <div className="order-details-modal">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>
              &times;
            </button>
            {/* Order Status Progress Bar */}
            <div className="status-progress-bar">
              {orderData.progress.map((stage, index) => (
                <div
                  key={index}
                  className={`status-stage ${orderData.status === stage ? 'active' : ''}`}
                >
                  {stage}
                </div>
              ))}
            </div>

            {/* Order Details */}
            <div className="order-info">
              <h3>Order Details</h3>
              <p>
                <strong>Order ID:</strong> {orderData.orderDetails.orderId}
              </p>
              <p>
                <strong>Order Date:</strong> {orderData.orderDetails.orderDate}
              </p>
              <p>
                <strong>Supplier:</strong> {orderData.orderDetails.supplier}
              </p>
              <p>
                <strong>Payment Mode:</strong> {orderData.orderDetails.paymentMode}
              </p>
              <p>
                <strong>Total Amount:</strong> Rs {orderData.orderDetails.totalAmount}
              </p>
            </div>

            {/* Order Items */}
            <div className="order-items">
              <h3>Order Items</h3>
              <ul>
                {orderData.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - {item.quantity} pcs @ Rs {item.price} each
                  </li>
                ))}
              </ul>
            </div>

            {/* Tracking History */}
            <div className="tracking-history">
              <h3>Tracking History</h3>
              <ul>
                {orderData.trackingHistory.map((event, index) => (
                  <li key={index}>
                    <strong>{event.date}</strong> at <strong>{event.time}</strong> - {event.event}{' '}
                    ({event.location})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManufacturerTrackOrdersPage;
