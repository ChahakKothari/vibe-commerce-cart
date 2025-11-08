const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/products - Get all products
router.get('/', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching products', error: err.message });
    }
    res.json(rows);
  });
});

// GET /api/products/:id - Get single product
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching product', error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(row);
  });
});

module.exports = router;