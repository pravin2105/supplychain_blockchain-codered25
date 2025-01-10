import React, { useState } from "react";
import { getProduct } from "../blockchain";

function GetProduct() {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState(null);

  const handleFetch = async () => {
    const productData = await getProduct(productId);
    setProduct(productData);
  };

  return (
    <div>
      <h1>Get Product</h1>
      <input
        type="text"
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <button onClick={handleFetch}>Fetch Product</button>
      {product && (
        <div>
          <p>Name: {product[0]}</p>
          <p>Origin: {product[1]}</p>
          <p>Owner: {product[2]}</p>
        </div>
      )}
    </div>
  );
}

export default GetProduct;
