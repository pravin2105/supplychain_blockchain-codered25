import React, { useState, useEffect } from 'react';
import './ManufacturerPlaceOrderPage.css';
import { FaShoppingCart } from 'react-icons/fa';

const ManufacturerPlaceOrderPage = () => {
  const [materials, setMaterials] = useState([]);
  const [cart, setCart] = useState([]);
  const [quantityPopup, setQuantityPopup] = useState({ show: false, product: null });
  const [cartSliderOpen, setCartSliderOpen] = useState(false);
  const [quantityInput, setQuantityInput] = useState(1);

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

  const handleAddToCart = (product) => {
    setQuantityPopup({ show: true, product });
  };

  const confirmQuantity = () => {
    if (quantityInput <= 0 || quantityInput > quantityPopup.product.quantity) {
      alert(`Please enter a valid quantity (1-${quantityPopup.product.quantity})`);
      return;
    }
    const existingItem = cart.find((item) => item.id === quantityPopup.product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === quantityPopup.product.id ? { ...item, quantity: item.quantity + quantityInput } : item
        )
      );
    } else {
      setCart([...cart, { ...quantityPopup.product, quantity: quantityInput }]);
    }
    setQuantityPopup({ show: false, product: null });
    setQuantityInput(1);
  };

  const handlePlaceOrder = async () => {
    try {
      for (const item of cart) {
        const order = {
          material_id: item.id,
          material_name: item.name,
          quantity: item.quantity,
          total_price: item.quantity * item.price,
        };
        await fetch('http://localhost:5000/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(order),
        });
      }
      alert('Order placed successfully');
      setCart([]);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order');
    }
  };

  return (
    <div className="place-order-page">
      <header className="page-header">
        <h1>Place New Order</h1>
        <div className="cart-icon" onClick={() => setCartSliderOpen(true)}>
          <FaShoppingCart size={24} />
          {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </div>
      </header>

      <div className="product-list grid">
        {materials.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image || 'placeholder.jpg'} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.quantity}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {quantityPopup.show && (
        <div className="quantity-popup">
          <div className="popup-content">
            <h3>Set Quantity for {quantityPopup.product.name}</h3>
            <input
              type="number"
              min="1"
              max={quantityPopup.product.quantity}
              value={quantityInput}
              onChange={(e) => setQuantityInput(parseInt(e.target.value) || 1)}
            />
            <button onClick={confirmQuantity}>OK</button>
            <button onClick={() => setQuantityPopup({ show: false, product: null })}>Cancel</button>
          </div>
        </div>
      )}

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
              <button className="proceed-button" onClick={handlePlaceOrder}>Place Order</button>
              <button className="close-button" onClick={() => setCartSliderOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManufacturerPlaceOrderPage;
