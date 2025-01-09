import React, { useState } from 'react';
import './SupplierNotificationsPage.css';

const SupplierNotificationsPage = () => {
  // Initial mock data for notifications
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'order', message: 'New order #105 from ABC Pvt Ltd placed for 100 units of Steel.', timestamp: '2025-01-06 10:00 AM', read: false },
    { id: 2, type: 'stock', message: 'Low stock alert: Copper has only 10 units left.', timestamp: '2025-01-06 09:30 AM', read: false },
    { id: 3, type: 'general', message: 'System maintenance scheduled on 7th January, 2025, from 1 AM to 3 AM.', timestamp: '2025-01-05 05:00 PM', read: false },
  ]);

  // Function to mark a notification as read
  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Function to clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="supplier-notifications-page">
      <h2>Notifications</h2>

      {/* Clear All Button */}
      <div className="notifications-actions">
        <button className="clear-all-button" onClick={clearAllNotifications}>
          Clear All
        </button>
      </div>

      {/* Notifications List */}
      <div className="notifications-list">
        {notifications.length === 0 ? (
          <p className="no-notifications">No notifications available.</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${notification.read ? 'read' : 'unread'}`}
            >
              <div className="notification-icon">
                {notification.type === 'order' && '📦'}
                {notification.type === 'stock' && '⚠️'}
                {notification.type === 'general' && 'ℹ️'}
              </div>
              <div className="notification-content">
                <p>{notification.message}</p>
                <span className="notification-timestamp">{notification.timestamp}</span>
              </div>
              {!notification.read && (
                <button
                  className="mark-as-read-button"
                  onClick={() => markAsRead(notification.id)}
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SupplierNotificationsPage;
