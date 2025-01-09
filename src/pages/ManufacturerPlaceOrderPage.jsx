// ManufacturerPlaceOrderPage.jsx
import React, { useState } from 'react';
import './ManufacturerPlaceOrderPage.css';
import { FaShoppingCart } from 'react-icons/fa';

const mockProducts = [
  { id: 1, name: 'Steel', price: 100, image: 'steel.jpg', stock: 50 },
  { id: 2, name: 'Copper', price: 75, image: 'copper.jpg', stock: 30 },
  { id: 3, name: 'Aluminum', price: 120, image: 'aluminum.jpg', stock: 20 },
  { id: 4, name: 'Plastic', price: 50, image: 'plastic.jpg', stock: 100 },
];

const ManufacturerPlaceOrderPage = () => {
  const [cart, setCart] = useState([]);
  const [quantityPopup, setQuantityPopup] = useState({ show: false, product: null });
  const [cartSliderOpen, setCartSliderOpen] = useState(false);
  const [quantityInput, setQuantityInput] = useState(1);

  // Handle Add to Cart
  const handleAddToCart = (product) => {
    setQuantityPopup({ show: true, product });
  };

  // Confirm Quantity and Add to Cart
  const confirmQuantity = () => {
    if (quantityInput <= 0 || quantityInput > quantityPopup.product.stock) {
      alert(`Please enter a valid quantity (1-${quantityPopup.product.stock})`);
      return;
    }
    const existingItem = cart.find((item) => item.id === quantityPopup.product.id);
    if (existingItem) {
      // Update quantity if already in cart
      setCart(
        cart.map((item) =>
          item.id === quantityPopup.product.id ? { ...item, quantity: item.quantity + quantityInput } : item
        )
      );
    } else {
      // Add new item to cart
      setCart([...cart, { ...quantityPopup.product, quantity: quantityInput }]);
    }
    setQuantityPopup({ show: false, product: null });
    setQuantityInput(1);
  };

  // Remove Item from Cart
  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Change Quantity in Cart
  const handleChangeQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) return;
    setCart(
      cart.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item))
    );
  };

  return (
    <div className="place-order-page">
      {/* Header with Cart Icon */}
      <header className="page-header">
        <h1>Place New Order</h1>
        <div className="cart-icon" onClick={() => setCartSliderOpen(true)}>
          <FaShoppingCart size={24} />
          {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </div>
      </header>

      {/* Product Grid */}
      <div className="product-list grid">
        {mockProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Quantity Popup */}
      {quantityPopup.show && (
        <div className="quantity-popup">
          <div className="popup-content">
            <h3>Set Quantity for {quantityPopup.product.name}</h3>
            <input
              type="number"
              min="1"
              max={quantityPopup.product.stock}
              value={quantityInput}
              onChange={(e) => setQuantityInput(parseInt(e.target.value) || 1)}
            />
            <button onClick={confirmQuantity}>OK</button>
            <button onClick={() => setQuantityPopup({ show: false, product: null })}>Cancel</button>
          </div>
        </div>
      )}

      {/* Cart Slider */}
      {cartSliderOpen && (
        <div className="cart-slider">
          <div className="slider-content">
            <h3>Your Cart</h3>
            <div className="cart-items-container">
              {cart.length === 0 ? (
                <p>No items in cart</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <span>{item.name}</span>
                    <span>Quantity: {item.quantity}</span>
                    <span>Total: ${item.quantity * item.price}</span>
                    <button onClick={() => handleChangeQuantity(item.id, item.quantity - 1)}>-</button>
                    <button onClick={() => handleChangeQuantity(item.id, item.quantity + 1)}>+</button>
                    <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                  </div>
                ))
              )}
            </div>
            <div className="cart-actions">
              <button className="proceed-button">Proceed to Pay</button>
              <button className="close-button" onClick={() => setCartSliderOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManufacturerPlaceOrderPage;
