import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } =
    useCart();
  const [isOpen, setIsOpen] = useState(true); // Start with cart open

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price / 100);
  };

  const handleClose = () => {
    console.log("Close button clicked");
    setIsOpen(false);
  };

  // Don't render anything if cart is closed
  if (!isOpen) {
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="cart-close-btn" onClick={handleClose}>
            ✕
          </button>
        </div>
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some delicious items to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>🛒 Your Cart ({items.length} items)</h2>
        <button className="cart-close-btn" onClick={handleClose}>
          ✕
        </button>
      </div>

      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image">
              <img
                src={
                  item.imageId
                    ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item.imageId}`
                    : "https://via.placeholder.com/80x80?text=Food"
                }
                alt={item.name}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/80x80?text=Food";
                }}
              />
            </div>

            <div className="cart-item-details">
              <h4 className="cart-item-name">{item.name}</h4>
              <p className="cart-item-price">{formatPrice(item.price)}</p>

              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                >
                  -
                </button>
                <span className="quantity-display">{item.quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>

            <div className="cart-item-total">
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                🗑️
              </button>
              <p>{formatPrice(item.price * item.quantity)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>{formatPrice(getCartTotal())}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee:</span>
            <span>₹40</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>{formatPrice(getCartTotal() + 4000)}</span>
          </div>
        </div>

        <div className="cart-actions">
          <button className="clear-cart-btn" onClick={clearCart}>
            Clear Cart
          </button>
          <button className="checkout-btn">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
