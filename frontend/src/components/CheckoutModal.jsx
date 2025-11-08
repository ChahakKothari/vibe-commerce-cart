import React, { useState } from 'react';
import { checkout } from '../services/api';

function CheckoutModal({ cart, onClose, onComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name || !formData.email) {
      setError('Please fill in all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email');
      return;
    }

    setLoading(true);
    try {
      const response = await checkout(formData.name, formData.email, cart.items);
      setReceipt(response.receipt);
    } catch (err) {
      setError('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (receipt) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content receipt" onClick={(e) => e.stopPropagation()}>
          <h2>✅ Order Confirmed!</h2>
          
          <div className="receipt-details">
            <p><strong>Order ID:</strong> {receipt.orderId}</p>
            <p><strong>Name:</strong> {receipt.customerName}</p>
            <p><strong>Email:</strong> {receipt.customerEmail}</p>
            <p><strong>Date:</strong> {new Date(receipt.timestamp).toLocaleString()}</p>
          </div>

          <div className="receipt-items">
            <h3>Items:</h3>
            {receipt.items.map((item, index) => (
              <div key={index} className="receipt-item">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="receipt-total">
            <strong>Total: ${receipt.totalAmount.toFixed(2)}</strong>
          </div>

          <button className="btn-primary" onClick={onComplete}>
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Checkout</h2>
        
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="checkout-summary">
            <p>Total Items: {cart.itemCount}</p>
            <p className="checkout-total">Total Amount: ${cart.totalAmount.toFixed(2)}</p>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutModal;