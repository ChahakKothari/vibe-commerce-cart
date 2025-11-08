const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Vibe Commerce API Running with SQLite' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Database: SQLite');
});