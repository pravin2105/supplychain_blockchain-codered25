import React, { useState } from 'react';
import './ManufacturerCreateSaleOrderPage.css';

const ManufacturerCreateSaleOrderPage = () => {
  const [view, setView] = useState('orderRequests'); // Track current view
  const [availableProducts, setAvailableProducts] = useState([
    { id: 1, name: 'Steel Rods', quantity: 100, price: 50, date: '2025-01-05', description: 'High-quality steel rods', image: 'steel.jpg' },
    { id: 2, name: 'Copper Sheets', quantity: 75, price: 70, date: '2025-01-02', description: 'Pure copper sheets', image: 'copper.jpg' },
  ]);
  const [warehouseProducts, setWarehouseProducts] = useState([
    { id: 1, name: 'Steel Rods', quantity: 500, date: '2025-01-01' },
    { id: 2, name: 'Copper Sheets', quantity: 300, date: '2025-01-02' },
  ]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantityToAdd, setQuantityToAdd] = useState('');

  // Handle adding products from warehouse to availability list
  const handleAddToAvailability = (product) => {
    setSelectedProduct(product);
  };

  const confirmAddToAvailability = () => {
    if (quantityToAdd > selectedProduct.quantity) {
      alert('Quantity exceeds available stock!');
      return;
    }

    const updatedAvailableProducts = [...availableProducts, {
      ...selectedProduct,
      quantity: parseInt(quantityToAdd),
    }];

    const updatedWarehouseProducts = warehouseProducts.map((p) =>
      p.id === selectedProduct.id ? { ...p, quantity: p.quantity - quantityToAdd } : p
    );

    setAvailableProducts(updatedAvailableProducts);
    setWarehouseProducts(updatedWarehouseProducts);
    setSelectedProduct(null);
    setQuantityToAdd('');
  };

  return (
    <div className="manufacturer-create-sale-order-page">
      <h2>Create Sales Orders</h2>

      {/* Toggle Buttons */}
      <div className="toggle-buttons">
        <button onClick={() => setView('availableProducts')} className={view === 'availableProducts' ? 'active' : ''}>
          Available Products Details
        </button>
        <button onClick={() => setView('orderRequests')} className={view === 'orderRequests' ? 'active' : ''}>
          Order Requests
        </button>
      </div>

      {/* Available Products Details */}
      {view === 'availableProducts' && (
        <div className="available-products-section">
          <h3>Available Products for Sale</h3>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price per Unit</th>
                <th>Date of Manufacture</th>
                <th>Description</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {availableProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>${product.price}</td>
                  <td>{product.date}</td>
                  <td>{product.description}</td>
                  <td><img src={product.image} alt={product.name} /></td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Warehouse Products</h3>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity in Warehouse</th>
                <th>Date of Manufacture</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {warehouseProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.date}</td>
                  <td><button onClick={() => handleAddToAvailability(product)}>Add to Availability List</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add to Availability Modal */}
      {selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add to Availability List</h3>
            <p>Product: {selectedProduct.name}</p>
            <p>Available Stock: {selectedProduct.quantity}</p>
            <input
              type="number"
              placeholder="Enter quantity"
              value={quantityToAdd}
              onChange={(e) => setQuantityToAdd(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={confirmAddToAvailability}>Confirm</button>
              <button onClick={() => setSelectedProduct(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Order Requests Section (Placeholder) */}
      {view === 'orderRequests' && (
        <div className="order-requests-section">
          <h3>Order Requests</h3>
          <p>This section will display order requests from middlemen.</p>
        </div>
      )}
    </div>
  );
};

export default ManufacturerCreateSaleOrderPage;
