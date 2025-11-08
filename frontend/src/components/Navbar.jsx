import React from 'react';

function Navbar({ cartCount, onCartClick }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <h1>🛒 Vibe Commerce</h1>
        </div>
        <div className="nav-actions">
          <button className="cart-button" onClick={onCartClick}>
            🛒 Cart 
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;