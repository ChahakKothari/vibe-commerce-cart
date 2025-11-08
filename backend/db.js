// const sqlite3 = require('sqlite3').verbose();
// const path = require('path');

// const dbPath = path.resolve(__dirname, process.env.DB_PATH || './database.sqlite');

// const db = new sqlite3.Database(dbPath, (err) => {
//   if (err) {
//     console.error('Database connection error:', err);
//   } else {
//     console.log('Connected to SQLite database');
//     initializeTables();
//   }
// });

// function initializeTables() {
//   // Products table
//   db.run(`
//     CREATE TABLE IF NOT EXISTS products (
//       id INTEGER PRIMARY KEY,
//       name TEXT NOT NULL,
//       price REAL NOT NULL,
//       image TEXT DEFAULT 'https://via.placeholder.com/150',
//       description TEXT DEFAULT '',
//       category TEXT DEFAULT 'General',
//       created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//     )
//   `);

//   // Cart table
//   db.run(`
//     CREATE TABLE IF NOT EXISTS cart (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       user_id TEXT DEFAULT 'guest-user',
//       product_id INTEGER NOT NULL,
//       name TEXT NOT NULL,
//       price REAL NOT NULL,
//       quantity INTEGER NOT NULL DEFAULT 1,
//       image TEXT,
//       created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//     )
//   `);

//   // Seed products if empty
//   db.get('SELECT COUNT(*) as count FROM products', [], (err, row) => {
//     if (row && row.count === 0) {
//       const products = [
//         [1, 'Wireless Headphones', 79.99, 'https://via.placeholder.com/150', 'High-quality wireless headphones', 'Electronics'],
//         [2, 'Smart Watch', 199.99, 'https://via.placeholder.com/150', 'Feature-rich smartwatch', 'Electronics'],
//         [3, 'Laptop Backpack', 49.99, 'https://via.placeholder.com/150', 'Durable laptop backpack', 'Accessories'],
//         [4, 'USB-C Cable', 12.99, 'https://via.placeholder.com/150', 'Fast charging cable', 'Accessories'],
//         [5, 'Bluetooth Speaker', 59.99, 'https://via.placeholder.com/150', 'Portable speaker', 'Electronics'],
//         [6, 'Phone Stand', 15.99, 'https://via.placeholder.com/150', 'Adjustable phone stand', 'Accessories'],
//         [7, 'Webcam HD', 89.99, 'https://via.placeholder.com/150', '1080p HD webcam', 'Electronics'],
//         [8, 'Mouse Pad', 9.99, 'https://via.placeholder.com/150', 'Large gaming mouse pad', 'Accessories']
//       ];

//       const stmt = db.prepare('INSERT INTO products (id, name, price, image, description, category) VALUES (?, ?, ?, ?, ?, ?)');
//       products.forEach(product => stmt.run(product));
//       stmt.finalize();
//       console.log('Database seeded with products');
//     }
//   });
// }

// module.exports = db;
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, process.env.DB_PATH || './database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeTables();
  }
});

function initializeTables() {
  // Products table
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT DEFAULT 'https://via.placeholder.com/150',
      description TEXT DEFAULT '',
      category TEXT DEFAULT 'General',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Cart table
  db.run(`
    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT DEFAULT 'guest-user',
      product_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      image TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Seed products if empty
  db.get('SELECT COUNT(*) as count FROM products', [], (err, row) => {
    if (row && row.count === 0) {
      const products = [
        [1, 'Wireless Headphones', 79.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', 'High-quality wireless headphones with premium sound', 'Electronics'],
        [2, 'Smart Watch', 199.99, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', 'Feature-rich smartwatch with health tracking', 'Electronics'],
        [3, 'Laptop Backpack', 49.99, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop', 'Durable laptop backpack with multiple compartments', 'Accessories'],
        [4, 'USB-C Cable', 12.99, 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=400&fit=crop', 'Fast charging USB-C cable', 'Accessories'],
        [5, 'Bluetooth Speaker', 59.99, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop', 'Portable Bluetooth speaker with rich bass', 'Electronics'],
        [6, 'Phone Stand', 15.99, 'https://images.unsplash.com/photo-1600087626014-e652e18bbff2?w=400&h=400&fit=crop', 'Adjustable phone stand for desk', 'Accessories'],
        [7, 'Webcam HD', 89.99, 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=400&fit=crop', '1080p HD webcam for video calls', 'Electronics'],
        [8, 'Mouse Pad', 9.99, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop', 'Large gaming mouse pad with smooth surface', 'Accessories']
      ];

      const stmt = db.prepare('INSERT INTO products (id, name, price, image, description, category) VALUES (?, ?, ?, ?, ?, ?)');
      products.forEach(product => stmt.run(product));
      stmt.finalize();
      console.log('Database seeded with products');
    }
  });
}

module.exports = db;