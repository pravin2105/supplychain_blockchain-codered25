import React, { useState, useEffect } from 'react';
import './SupplierOrdersPage.css';

const SupplierOrdersPage = () => {
  const [orders, setOrders] = useState([
    {
      id: 101,
      manufacturer: 'ABC Pvt Ltd',
      material: 'Steel',
      quantity: 50,
      status: 'Pending',
      paymentStatus: 'Pending',
      collected: false,
      date: '2025-01-05',
      completionDate: '-',
      deliveryPickupDate: '2025-01-10 10:00 AM',
      paymentReceivedDate: '-',
      manufacturerDetails: 'ABC Pvt Ltd, 123 Industrial Park, City A',
      otp: null,
      otpVerified: false,
    },
    {
      id: 102,
      manufacturer: 'XYZ Ltd',
      material: 'Copper',
      quantity: 30,
      status: 'In Progress',
      paymentStatus: 'Completed',
      collected: false,
      date: '2025-01-04',
      completionDate: '-',
      deliveryPickupDate: '2025-01-09 02:00 PM',
      paymentReceivedDate: '2025-01-05',
      manufacturerDetails: 'XYZ Ltd, 456 Business Hub, City B',
      otp: null,
      otpVerified: false,
    },
    {
      id: 103,
      manufacturer: 'LMN Co.',
      material: 'Aluminum',
      quantity: 70,
      status: 'Completed',
      paymentStatus: 'Completed',
      collected: true,
      date: '2025-01-03',
      completionDate: '2025-01-06',
      deliveryPickupDate: '2025-01-08 04:00 PM',
      paymentReceivedDate: '2025-01-04',
      manufacturerDetails: 'LMN Co., 789 Commercial Zone, City C',
      otp: null,
      otpVerified: true,
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false); // New state for "More Details" modal
  const [otpInput, setOtpInput] = useState('');

  // Function to handle "Get OTP" button click
  const handleGetOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    setSelectedOrder((prevOrder) => ({ ...prevOrder, otp }));
    alert('OTP has been sent to the manufacturer.');
  };

  // Function to handle OTP verification
  const handleVerifyOtp = () => {
    if (selectedOrder.otp && parseInt(otpInput) === selectedOrder.otp) {
      const updatedOrders = orders.map((order) =>
        order.id === selectedOrder.id
          ? {
              ...order,
              otpVerified: true,
              collected: true,
              status: order.paymentStatus === 'Completed' ? 'Completed' : 'In Progress',
              completionDate:
                order.paymentStatus === 'Completed'
                  ? new Date().toISOString().split('T')[0]
                  : '-',
            }
          : order
      );
      setOrders(updatedOrders);
      alert('Order verified successfully!');
      setShowModal(false);
    } else {
      alert('Invalid OTP. Please try again.');
    }
    setOtpInput('');
  };

  // Function to handle "View More Details" button click
  const handleViewMoreDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  return (
    <div className="supplier-orders-page">
      <h2>Orders Management</h2>

      {/* Orders Table */}
      <div className="orders-table">
        <h3>All Orders</h3>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Manufacturer</th>
              <th>Raw Material</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Payment Status</th>
              <th>Collected</th>
              <th>Order Date</th>
              <th>Completion Date</th>
              <th>Verify</th>
              <th>More Information</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.manufacturer}</td>
                <td>{order.material}</td>
                <td>{order.quantity}</td>
                <td>{order.status}</td>
                <td>{order.paymentStatus}</td>
                <td>{order.collected ? 'Yes' : 'No'}</td>
                <td>{order.date}</td>
                <td>{order.completionDate}</td>
                <td>
                  {order.otpVerified ? (
                    <span className="verified-text">Verified</span>
                  ) : (
                    <button
                      className="verify-button"
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowModal(true);
                      }}
                    >
                      Verify
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="view-details-button"
                    onClick={() => handleViewMoreDetails(order)}
                  >
                    View More Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Verification */}
      {showModal && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Verify Order (ID: {selectedOrder.id})</h3>
            <p>
              <strong>Manufacturer:</strong> {selectedOrder.manufacturer}
            </p>
            <p>
              <strong>Payment Status:</strong> {selectedOrder.paymentStatus}
            </p>
            <button className="get-otp-button" onClick={handleGetOtp}>
              Get OTP
            </button>
            <input
              type="text"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              placeholder="Enter OTP"
            />
            <button className="submit-verify-button" onClick={handleVerifyOtp}>
              Submit
            </button>
            <button className="close-modal-button" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for More Information */}
      {showDetailsModal && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Order Details (ID: {selectedOrder.id})</h3>
            <p>
              <strong>Manufacturer:</strong> {selectedOrder.manufacturer}
            </p>
            <p>
              <strong>Raw Material:</strong> {selectedOrder.material}
            </p>
            <p>
              <strong>Quantity:</strong> {selectedOrder.quantity}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <p>
              <strong>Payment Status:</strong> {selectedOrder.paymentStatus}
            </p>
            <p>
              <strong>Collected:</strong> {selectedOrder.collected ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Order Date:</strong> {selectedOrder.date}
            </p>
            <p>
              <strong>Completion Date:</strong> {selectedOrder.completionDate}
            </p>
            <p>
              <strong>Delivery Pickup Date:</strong> {selectedOrder.deliveryPickupDate}
            </p>
            <p>
              <strong>Payment Received Date:</strong> {selectedOrder.paymentReceivedDate}
            </p>
            <p>
              <strong>Manufacturer Details:</strong> {selectedOrder.manufacturerDetails}
            </p>
            <button className="close-modal-button" onClick={() => setShowDetailsModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierOrdersPage;
