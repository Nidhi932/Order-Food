import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import Notification from "./Notification";

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
  const handleCheckout = () => {
    // Show success notification
    setNotification({
      message: `Order placed successfully! Total: ${formatPrice(
        getCartTotal() + 4000
      )}`,
      type: "success",
    });

    // Clear the cart after a short delay to show the notification
    setTimeout(() => {
      clearCart();
      // Close cart after checkout
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    }, 500);
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
          <div className="empty-cart-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#666"
              height="90px"
              className="size-6"
              style={{ transform: "scaleX(-1)" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </div>
          <h3>Your cart is empty</h3>
          <p>Add some delicious items to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Your Cart ({items.length} items)</h2>
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
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                  />
                </svg>
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
