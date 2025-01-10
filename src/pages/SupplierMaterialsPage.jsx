import React, { useState, useEffect } from 'react';
import './SupplierMaterialsPage.css';

const SupplierMaterialsPage = () => {
  const [materials, setMaterials] = useState([]);
  const [newMaterial, setNewMaterial] = useState({
    name: '',
    type: '',
    quantity: '',
    price: '',
    description: '',
    image: null,
  });

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await fetch('http://localhost:5000/materials');
      const data = await response.json();
      setMaterials(data);
    } catch (error) {
      console.error('Error fetching materials:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewMaterial({ ...newMaterial, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNewMaterial({ ...newMaterial, image: e.target.files[0] });
  };

  const handleAddMaterial = async (e) => {
    e.preventDefault();
    const materialToAdd = {
      ...newMaterial,
      quantity: parseInt(newMaterial.quantity),
      price: parseFloat(newMaterial.price),
    };

    try {
      const response = await fetch('http://localhost:5000/materials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(materialToAdd),
      });

      if (response.ok) {
        alert('Material added successfully');
        fetchMaterials(); // Refresh the list after adding
        setNewMaterial({ name: '', type: '', quantity: '', price: '', description: '', image: null });
        setShowForm(false);
      } else {
        alert('Failed to add material');
      }
    } catch (error) {
      console.error('Error adding material:', error);
    }
  };

  const handleDeleteMaterial = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/materials/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Material deleted successfully');
        fetchMaterials(); // Refresh the list after deleting
      } else {
        alert('Failed to delete material');
      }
    } catch (error) {
      console.error('Error deleting material:', error);
    }
  };

  return (
    <div className="supplier-materials-page">
      <h2>Raw Materials Management</h2>

      <div className="materials-table">
        <h3>All Raw Materials</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material) => (
              <tr key={material.id}>
                <td>{material.id}</td>
                <td>{material.name}</td>
                <td>{material.type}</td>
                <td>{material.quantity}</td>
                <td>${material.price}</td>
                <td>{material.description}</td>
                <td>{material.image ? <img src={material.image} alt={material.name} className="material-image" /> : 'N/A'}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDeleteMaterial(material.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="add-button" onClick={() => setShowForm(true)}>
        Add New Material
      </button>

      {showForm && (
        <div className="form-popup">
          <div className="form-popup-content">
            <h3>Add New Raw Material</h3>
            <form onSubmit={handleAddMaterial}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={newMaterial.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="type">Type:</label>
                <input type="text" id="type" name="type" value={newMaterial.type} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={newMaterial.quantity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={newMaterial.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={newMaterial.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="add-button">
                Add Material
              </button>
              <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierMaterialsPage;
