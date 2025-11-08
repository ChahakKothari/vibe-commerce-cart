import React from 'react';

function Cart({ cart, onRemove, onUpdateQuantity, onCheckout, onContinueShopping }) {
  if (cart.items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your Cart is Empty</h2>
        <p>Add some products to get started!</p>
        <button className="btn-primary" onClick={onContinueShopping}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-section">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <button className="btn-secondary" onClick={onContinueShopping}>
          Continue Shopping
        </button>
      </div>

      <div className="cart-items">
        {cart.items.map((item) => (
          <div key={item.productId} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p className="cart-item-price">${item.price.toFixed(2)}</p>
            </div>

            <div className="cart-item-actions">
              <div className="quantity-controls">
                <button 
                  onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}>
                  +
                </button>
              </div>
              
              <div className="cart-item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              
              <button 
                className="remove-btn"
                onClick={() => onRemove(item.productId)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal ({cart.itemCount} items):</span>
          <span className="total-amount">${cart.totalAmount.toFixed(2)}</span>
        </div>
        <button className="checkout-btn" onClick={onCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;