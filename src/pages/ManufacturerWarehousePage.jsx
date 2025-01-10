import React, { useState, useEffect } from 'react';
import './ManufacturerWarehousePage.css';

const ManufacturerWarehousePage = () => {
  const [stock, setStock] = useState([]);
  const [newProduct, setNewProduct] = useState({ product: '', quantity: '', description: '' });

  // Fetch warehouse stock from the backend
  useEffect(() => {
    fetchWarehouseStock();
  }, []);

  const fetchWarehouseStock = async () => {
    try {
      const response = await fetch('http://localhost:5000/warehouse-stock');
      const data = await response.json();
      setStock(data);
    } catch (error) {
      console.error('Error fetching warehouse stock:', error);
    }
  };

  // Handle input changes for new product
  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Handle adding new product to warehouse
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (newProduct.product && newProduct.quantity && newProduct.description) {
      const productToAdd = {
        product: newProduct.product,
        quantity: parseInt(newProduct.quantity),
        description: newProduct.description,
      };

      try {
        const response = await fetch('http://localhost:5000/warehouse-stock', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productToAdd),
        });

        if (response.ok) {
          alert('Product added successfully');
          fetchWarehouseStock(); // Refresh the list after adding
          setNewProduct({ product: '', quantity: '', description: '' });
        } else {
          alert('Failed to add product');
        }
      } catch (error) {
        console.error('Error adding product:', error);
        alert('Error adding product');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  // Handle deleting a product from warehouse
  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/warehouse-stock/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Product deleted successfully');
        fetchWarehouseStock(); // Refresh the list after deleting
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    }
  };

  return (
    <div className="manufacturer-warehouse-page">
      <h2>Warehouse Management</h2>

      {/* Add New Product Form */}
      <div className="add-product-form">
        <h3>Add New Product</h3>
        <form onSubmit={handleAddProduct}>
          <input
            type="text"
            name="product"
            placeholder="Product Name"
            value={newProduct.product}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newProduct.quantity}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Product Description"
            value={newProduct.description}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Add Product</button>
        </form>
      </div>

      {/* Warehouse Stock Table */}
      <div className="warehouse-stock-table">
        <h3>Current Stock</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Date Added</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stock.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.product}</td>
                <td>{item.quantity}</td>
                <td>{item.date_added}</td>
                <td>{item.description}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDeleteProduct(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManufacturerWarehousePage;
