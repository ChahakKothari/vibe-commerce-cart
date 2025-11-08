import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import { getProducts, getCart, addToCart, removeFromCart, updateCartItem } from './services/api';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], totalAmount: 0, itemCount: 0 });
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');

  useEffect(() => {
  loadProducts();
  loadCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      showNotification('Error loading products');
    } finally {
      setLoading(false);
    }
  };

  const loadCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const response = await addToCart(productId, 1);
      setCart(response.cart);
      showNotification('Item added to cart!');
    } catch (error) {
      showNotification('Error adding to cart');
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await removeFromCart(productId);
      setCart(response.cart);
      showNotification('Item removed from cart');
    } catch (error) {
      showNotification('Error removing from cart');
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      const response = await updateCartItem(productId, quantity);
      setCart(response.cart);
    } catch (error) {
      showNotification('Error updating quantity');
    }
  };

  const handleCheckoutComplete = () => {
    setShowCheckout(false);
    setShowCart(false);
    loadCart();
    showNotification('Order placed successfully!');
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="App">
      <Navbar 
        cartCount={cart.itemCount}
        onCartClick={() => setShowCart(!showCart)}
      />
      
      {notification && (
        <div className="notification">{notification}</div>
      )}

      <div className="container">
        {showCart ? (
          <Cart 
            cart={cart}
            onRemove={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
            onCheckout={() => setShowCheckout(true)}
            onContinueShopping={() => setShowCart(false)}
          />
        ) : (
          <ProductGrid 
            products={products}
            onAddToCart={handleAddToCart}
          />
        )}
      </div>

      {showCheckout && (
        <CheckoutModal 
          cart={cart}
          onClose={() => setShowCheckout(false)}
          onComplete={handleCheckoutComplete}
        />
      )}
    </div>
  );
}

export default App;