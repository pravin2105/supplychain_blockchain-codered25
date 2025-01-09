import React, { useState } from 'react';
import './SupplierMaterialsPage.css';

const SupplierMaterialsPage = () => {
  // Initial mock data for raw materials
  const [materials, setMaterials] = useState([
    { id: 1, name: 'Steel', type: 'Metal', quantity: 100, price: 50, image: '', description: 'High-grade steel' },
    { id: 2, name: 'Copper', type: 'Metal', quantity: 75, price: 70, image: '', description: 'Refined copper' },
    { id: 3, name: 'Wood', type: 'Organic', quantity: 200, price: 30, image: '', description: 'Quality timber' },
  ]);

  const [newMaterial, setNewMaterial] = useState({
    name: '',
    type: '',
    quantity: '',
    price: '',
    description: '',
    image: null,
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Handle form input change
  const handleInputChange = (e) => {
    setNewMaterial({ ...newMaterial, [e.target.name]: e.target.value });
  };

  // Handle file input change for image upload
  const handleFileChange = (e) => {
    setNewMaterial({ ...newMaterial, image: e.target.files[0] });
  };

  // Handle adding new material
  const handleAddMaterial = (e) => {
    e.preventDefault();

    // Create new material object
    const materialToAdd = {
      id: materials.length + 1,
      name: newMaterial.name,
      type: newMaterial.type,
      quantity: parseInt(newMaterial.quantity),
      price: parseFloat(newMaterial.price),
      description: newMaterial.description,
      image: URL.createObjectURL(newMaterial.image),
    };

    // Update state with new material
    setMaterials([...materials, materialToAdd]);

    // Clear form inputs
    setNewMaterial({ name: '', type: '', quantity: '', price: '', description: '', image: null });
  };

  // Handle editing an existing material
  const handleEditMaterial = (id) => {
    const materialToEdit = materials.find((material) => material.id === id);
    setNewMaterial({
      name: materialToEdit.name,
      type: materialToEdit.type,
      quantity: materialToEdit.quantity,
      price: materialToEdit.price,
      description: materialToEdit.description,
      image: materialToEdit.image,
    });
    setEditMode(true);
    setEditId(id);
  };

  // Handle saving edited material
  const handleSaveMaterial = (e) => {
    e.preventDefault();
    setMaterials((prevMaterials) =>
      prevMaterials.map((material) =>
        material.id === editId
          ? {
              ...material,
              name: newMaterial.name,
              type: newMaterial.type,
              quantity: parseInt(newMaterial.quantity),
              price: parseFloat(newMaterial.price),
              description: newMaterial.description,
              image: newMaterial.image ? URL.createObjectURL(newMaterial.image) : material.image,
            }
          : material
      )
    );

    // Clear form and exit edit mode
    setNewMaterial({ name: '', type: '', quantity: '', price: '', description: '', image: null });
    setEditMode(false);
    setEditId(null);
  };

  // Handle deleting a material
  const handleDeleteMaterial = (id) => {
    const updatedMaterials = materials.filter((material) => material.id !== id);
    setMaterials(updatedMaterials);
  };

  return (
    <div className="supplier-materials-page">
      <h2>Raw Materials Management</h2>

      {/* Raw Materials Table */}
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
                <td>
                  {material.image && <img src={material.image} alt={material.name} className="material-image" />}
                </td>
                <td>
                  <button className="edit-button" onClick={() => handleEditMaterial(material.id)}>
                    Edit
                  </button>
                  <button className="delete-button" onClick={() => handleDeleteMaterial(material.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add or Edit Material Form */}
      <div className="add-material-form">
        <h3>{editMode ? 'Edit Raw Material' : 'Add New Raw Material'}</h3>
        <form onSubmit={editMode ? handleSaveMaterial : handleAddMaterial}>
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
          <div className="form-group">
            <label htmlFor="image">Image (Recommended ratio: 4:3):</label>
            <input type="file" id="image" name="image" onChange={handleFileChange} accept="image/*" />
          </div>
          <button type="submit" className="add-button">
            {editMode ? 'Save Changes' : 'Add Material'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupplierMaterialsPage;
