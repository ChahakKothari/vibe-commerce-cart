// const express = require('express');
// const router = express.Router();
// const db = require('../db');

// const MOCK_USER_ID = 'guest-user';

// // GET /api/cart - Get cart with total
// router.get('/', (req, res) => {
//   db.all('SELECT * FROM cart WHERE user_id = ?', [MOCK_USER_ID], (err, items) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error fetching cart', error: err.message });
//     }
    
//     const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//     const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    
//     res.json({
//       items: items.map(item => ({
//         productId: item.product_id,
//         name: item.name,
//         price: item.price,
//         quantity: item.quantity,
//         image: item.image
//       })),
//       totalAmount,
//       itemCount
//     });
//   });
// });

// // POST /api/cart - Add item to cart
// router.post('/', (req, res) => {
//   const { productId, quantity = 1 } = req.body;
  
//   if (!productId) {
//     return res.status(400).json({ message: 'Product ID is required' });
//   }
  
//   // Get product details
//   db.get('SELECT * FROM products WHERE id = ?', [productId], (err, product) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error fetching product', error: err.message });
//     }
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
    
//     // Check if item exists in cart
//     db.get('SELECT * FROM cart WHERE user_id = ? AND product_id = ?', [MOCK_USER_ID, productId], (err, existingItem) => {
//       if (err) {
//         return res.status(500).json({ message: 'Error checking cart', error: err.message });
//       }
      
//       if (existingItem) {
//         // Update quantity
//         const newQuantity = existingItem.quantity + quantity;
//         db.run('UPDATE cart SET quantity = ? WHERE id = ?', [newQuantity, existingItem.id], (err) => {
//           if (err) {
//             return res.status(500).json({ message: 'Error updating cart', error: err.message });
//           }
//           getCartResponse(res);
//         });
//       } else {
//         // Add new item
//         db.run(
//           'INSERT INTO cart (user_id, product_id, name, price, quantity, image) VALUES (?, ?, ?, ?, ?, ?)',
//           [MOCK_USER_ID, product.id, product.name, product.price, quantity, product.image],
//           (err) => {
//             if (err) {
//               return res.status(500).json({ message: 'Error adding to cart', error: err.message });
//             }
//             getCartResponse(res);
//           }
//         );
//       }
//     });
//   });
// });

// // DELETE /api/cart/:id - Remove item from cart
// router.delete('/:id', (req, res) => {
//   const productId = parseInt(req.params.id);
  
//   db.run('DELETE FROM cart WHERE user_id = ? AND product_id = ?', [MOCK_USER_ID, productId], (err) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error removing item', error: err.message });
//     }
//     getCartResponse(res);
//   });
// });

// // PUT /api/cart/:id - Update item quantity
// router.put('/:id', (req, res) => {
//   const productId = parseInt(req.params.id);
//   const { quantity } = req.body;
  
//   if (!quantity || quantity < 1) {
//     return res.status(400).json({ message: 'Valid quantity is required' });
//   }
  
//   db.run('UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?', [quantity, MOCK_USER_ID, productId], (err) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error updating cart', error: err.message });
//     }
//     getCartResponse(res);
//   });
// });

// // POST /api/checkout - Mock checkout
// // router.post('/checkout', (req, res) => {
// //   const { customerName, customerEmail } = req.body;
  
// //   if (!customerName || !customerEmail) {
// //     return res.status(400).json({ message: 'Customer name and email are required' });
// //   }
  
// //   db.all('SELECT * FROM cart WHERE user_id = ?', [MOCK_USER_ID], (err, items) => {
// //     if (err) {
// //       return res.status(500).json({ message: 'Error fetching cart', error: err.message });
// //     }
    
// //     if (items.length === 0) {
// //       return res.status(400).json({ message: 'Cart is empty' });
// //     }
    
// //     const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
// //     const receipt = {
// //       orderId: `ORD-${Date.now()}`,
// //       customerName,
// //       customerEmail,
// //       items: items.map(item => ({
// //         productId: item.product_id,
// //         name: item.name,
// //         price: item.price,
// //         quantity: item.quantity,
// //         image: item.image
// //       })),
// //       totalAmount,
// //       timestamp: new Date().toISOString(),
// //       status: 'SUCCESS'
// //     };
    
// //     // Clear cart
// //     db.run('DELETE FROM cart WHERE user_id = ?', [MOCK_USER_ID], (err) => {
// //       if (err) {
// //         return res.status(500).json({ message: 'Error clearing cart', error: err.message });
// //       }
// //       res.json({ message: 'Checkout successful', receipt });
// //     });
// //   });
// // });
// // POST /api/cart/checkout - Mock checkout
// router.post('/checkout', (req, res) => {
//   const { customerName, customerEmail } = req.body;
  
//   console.log('Checkout request:', { customerName, customerEmail }); // DEBUG
  
//   if (!customerName || !customerEmail) {
//     return res.status(400).json({ message: 'Customer name and email are required' });
//   }
  
//   db.all('SELECT * FROM cart WHERE user_id = ?', [MOCK_USER_ID], (err, items) => {
//     if (err) {
//       console.error('Cart fetch error:', err); // DEBUG
//       return res.status(500).json({ message: 'Error fetching cart', error: err.message });
//     }
    
//     if (items.length === 0) {
//       return res.status(400).json({ message: 'Cart is empty' });
//     }
    
//     const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
//     const receipt = {
//       orderId: `ORD-${Date.now()}`,
//       customerName,
//       customerEmail,
//       items: items.map(item => ({
//         productId: item.product_id,
//         name: item.name,
//         price: item.price,
//         quantity: item.quantity,
//         image: item.image
//       })),
//       totalAmount,
//       timestamp: new Date().toISOString(),
//       status: 'SUCCESS'
//     };
    
//     console.log('Receipt created:', receipt); // DEBUG
    
//     // Clear cart
//     db.run('DELETE FROM cart WHERE user_id = ?', [MOCK_USER_ID], (err) => {
//       if (err) {
//         console.error('Cart clear error:', err); // DEBUG
//         return res.status(500).json({ message: 'Error clearing cart', error: err.message });
//       }
//       res.json({ message: 'Checkout successful', receipt });
//     });
//   });
// });

// // Helper function
// function getCartResponse(res) {
//   db.all('SELECT * FROM cart WHERE user_id = ?', [MOCK_USER_ID], (err, items) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error fetching cart', error: err.message });
//     }
    
//     const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//     const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    
//     res.json({
//       message: 'Cart updated',
//       cart: {
//         items: items.map(item => ({
//           productId: item.product_id,
//           name: item.name,
//           price: item.price,
//           quantity: item.quantity,
//           image: item.image
//         })),
//         totalAmount,
//         itemCount
//       }
//     });
//   });
// }

// module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../db');

const MOCK_USER_ID = 'guest-user';

// GET /api/cart - Get cart with total
router.get('/', (req, res) => {
  db.all('SELECT * FROM cart WHERE user_id = ?', [MOCK_USER_ID], (err, items) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching cart', error: err.message });
    }
    
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    
    res.json({
      items: items.map(item => ({
        productId: item.product_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      totalAmount,
      itemCount
    });
  });
});

// POST /api/cart - Add item to cart
router.post('/', (req, res) => {
  const { productId, quantity = 1 } = req.body;
  
  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' });
  }
  
  // Get product details
  db.get('SELECT * FROM products WHERE id = ?', [productId], (err, product) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching product', error: err.message });
    }
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Check if item exists in cart
    db.get('SELECT * FROM cart WHERE user_id = ? AND product_id = ?', [MOCK_USER_ID, productId], (err, existingItem) => {
      if (err) {
        return res.status(500).json({ message: 'Error checking cart', error: err.message });
      }
      
      if (existingItem) {
        // Update quantity
        const newQuantity = existingItem.quantity + quantity;
        db.run('UPDATE cart SET quantity = ? WHERE id = ?', [newQuantity, existingItem.id], (err) => {
          if (err) {
            return res.status(500).json({ message: 'Error updating cart', error: err.message });
          }
          getCartResponse(res);
        });
      } else {
        // Add new item
        db.run(
          'INSERT INTO cart (user_id, product_id, name, price, quantity, image) VALUES (?, ?, ?, ?, ?, ?)',
          [MOCK_USER_ID, product.id, product.name, product.price, quantity, product.image],
          (err) => {
            if (err) {
              return res.status(500).json({ message: 'Error adding to cart', error: err.message });
            }
            getCartResponse(res);
          }
        );
      }
    });
  });
});

// DELETE /api/cart/:id - Remove item from cart
router.delete('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  
  db.run('DELETE FROM cart WHERE user_id = ? AND product_id = ?', [MOCK_USER_ID, productId], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error removing item', error: err.message });
    }
    getCartResponse(res);
  });
});

// PUT /api/cart/:id - Update item quantity
router.put('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const { quantity } = req.body;
  
  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: 'Valid quantity is required' });
  }
  
  db.run('UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?', [quantity, MOCK_USER_ID, productId], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating cart', error: err.message });
    }
    getCartResponse(res);
  });
});

// POST /api/cart/checkout - Mock checkout ✅ WORKING ROUTE
router.post('/checkout', (req, res) => {
  const { customerName, customerEmail } = req.body;
  
  console.log('✅ Checkout request received:', { customerName, customerEmail });
  
  if (!customerName || !customerEmail) {
    return res.status(400).json({ message: 'Customer name and email are required' });
  }
  
  db.all('SELECT * FROM cart WHERE user_id = ?', [MOCK_USER_ID], (err, items) => {
    if (err) {
      console.error('❌ Cart fetch error:', err);
      return res.status(500).json({ message: 'Error fetching cart', error: err.message });
    }
    
    if (items.length === 0) {
      console.log('⚠️ Cart is empty');
      return res.status(400).json({ message: 'Cart is empty' });
    }
    
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const receipt = {
      orderId: `ORD-${Date.now()}`,
      customerName,
      customerEmail,
      items: items.map(item => ({
        productId: item.product_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      totalAmount,
      timestamp: new Date().toISOString(),
      status: 'SUCCESS'
    };
    
    console.log('✅ Receipt created:', receipt.orderId);
    
    // Clear cart after successful checkout
    db.run('DELETE FROM cart WHERE user_id = ?', [MOCK_USER_ID], (err) => {
      if (err) {
        console.error('❌ Cart clear error:', err);
        return res.status(500).json({ message: 'Error clearing cart', error: err.message });
      }
      console.log('✅ Cart cleared successfully');
      res.json({ message: 'Checkout successful', receipt });
    });
  });
});

// Helper function to get cart response
function getCartResponse(res) {
  db.all('SELECT * FROM cart WHERE user_id = ?', [MOCK_USER_ID], (err, items) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching cart', error: err.message });
    }
    
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    
    res.json({
      message: 'Cart updated',
      cart: {
        items: items.map(item => ({
          productId: item.product_id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        totalAmount,
        itemCount
      }
    });
  });
}

module.exports = router;