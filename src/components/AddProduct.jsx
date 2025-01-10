import React, { useState } from "react";
import { addProduct } from "../blockchain";

function AddProduct() {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProduct(name, origin);
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
