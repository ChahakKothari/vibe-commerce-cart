// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// export const getProducts = async () => {
//   try {
//     const response = await api.get('/products');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     throw error;
//   }
// };

// export const getCart = async () => {
//   try {
//     const response = await api.get('/cart');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching cart:', error);
//     throw error;
//   }
// };

// export const addToCart = async (productId, quantity = 1) => {
//   try {
//     const response = await api.post('/cart', { productId, quantity });
//     return response.data;
//   } catch (error) {
//     console.error('Error adding to cart:', error);
//     throw error;
//   }
// };

// export const removeFromCart = async (productId) => {
//   try {
//     const response = await api.delete(`/cart/${productId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error removing from cart:', error);
//     throw error;
//   }
// };

// export const updateCartItem = async (productId, quantity) => {
//   try {
//     const response = await api.put(`/cart/${productId}`, { quantity });
//     return response.data;
//   } catch (error) {
//     console.error('Error updating cart:', error);
//     throw error;
//   }
// };

// export const checkout = async (customerName, customerEmail, cartItems) => {
//   try {
//     const response = await api.post('/checkout', {
//       customerName,
//       customerEmail,
//       cartItems
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error during checkout:', error);
//     throw error;
//   }
// };

// export default api;
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getCart = async () => {
  try {
    const response = await api.get('/cart');
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export const addToCart = async (productId, quantity = 1) => {
  try {
    const response = await api.post('/cart', { productId, quantity });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const removeFromCart = async (productId) => {
  try {
    const response = await api.delete(`/cart/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

export const updateCartItem = async (productId, quantity) => {
  try {
    const response = await api.put(`/cart/${productId}`, { quantity });
    return response.data;
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};

export const checkout = async (customerName, customerEmail, cartItems) => {
  try {
    const response = await api.post('/cart/checkout', {  // ✅ CHANGED THIS LINE
      customerName,
      customerEmail,
      cartItems
    });
    return response.data;
  } catch (error) {
    console.error('Error during checkout:', error);
    throw error;
  }
};

export default api;