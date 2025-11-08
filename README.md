# 🛒 Vibe Commerce - Full Stack E-Commerce Cart
<img width="1920" height="1080" alt="Screenshot (1654)" src="https://github.com/user-attachments/assets/dcfe55da-00fd-44e9-b7e4-3eaa751edc2e" />


A complete full-stack shopping cart application built with React, Node.js, Express, and SQLite.

## 🎯 Features

- **Product Catalog**: Browse products with images and details
- **Shopping Cart**: Add, remove, and update item quantities
- **Cart Management**: Real-time cart total and item count
- **Checkout Flow**: Mock checkout with customer details
- **Order Receipt**: Detailed order confirmation with timestamp
- **Responsive Design**: Works on desktop and mobile devices
- **Database Persistence**: SQLite database for cart and products

## 🛠️ Tech Stack

### Frontend
- **React** 18.x - UI library
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with gradients and animations

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **SQLite3** - Lightweight database
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/vibe-commerce-cart.git
cd vibe-commerce-cart
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```

Backend will run on: `http://localhost:5000`

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm start
```

Frontend will run on: `http://localhost:3000`

## 🗂️ Project Structure
```
vibe-commerce-cart/
├── backend/
│   ├── routes/
│   │   ├── cart.js          # Cart API routes
│   │   └── products.js      # Products API routes
│   ├── db.js                # SQLite database setup
│   ├── server.js            # Express server
│   ├── .env                 # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   ├── Cart.jsx
│   │   │   └── CheckoutModal.jsx
│   │   ├── services/
│   │   │   └── api.js       # API service layer
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── screenshots/
│   ├── products-page.png
│   ├── cart-view.png
│   ├── checkout-modal.png
│   └── receipt.png
└── README.md
```
<img width="1920" height="1080" alt="Screenshot (1654)" src="https://github.com/user-attachments/assets/55a6b7f3-c117-4ef6-ac6a-f5782fad1557" />

## 🔌 API Endpoints

### Products
- **GET** `/api/products` - Get all products

### Cart
- **GET** `/api/cart` - Get cart with total
- **POST** `/api/cart` - Add item to cart
```json
  { "productId": 1, "quantity": 1 }
```
- **PUT** `/api/cart/:id` - Update item quantity
```json
  { "quantity": 2 }
```
- **DELETE** `/api/cart/:id` - Remove item from cart

### Checkout
- **POST** `/api/cart/checkout` - Process checkout
```json
  {
    "customerName": "John Doe",
    "customerEmail": "john@example.com"
  }
```

## 📸 Screenshots

<img width="1920" height="1080" alt="Screenshot (1654)" src="https://github.com/user-attachments/assets/e13c5571-141b-4f0e-801c-787ed2439aef" />

## ✅ Features Implemented

- [x] Backend REST API with 5 endpoints
- [x] Frontend React application with components
- [x] SQLite database for persistence
- [x] Add to cart functionality
- [x] Update cart quantities
- [x] Remove items from cart
- [x] Real-time cart total calculation
- [x] Mock checkout flow
- [x] Order receipt generation
- [x] Responsive design
- [x] Error handling
- [x] Product images from Unsplash

## 🚀 Usage

1. **Browse Products**: View 8 products on the homepage
2. **Add to Cart**: Click "Add to Cart" on any product
3. **View Cart**: Click cart icon in navbar
4. **Manage Cart**: Update quantities with +/- buttons or remove items
5. **Checkout**: Click "Proceed to Checkout"
6. **Complete Order**: Enter name and email, submit
7. **Receipt**: View order confirmation with order ID

## 🔧 Configuration

### Backend (.env)
```
PORT=5000
DB_PATH=./database.sqlite
```

### Frontend (API Base URL)
```javascript
// src/services/api.js
const API_BASE_URL = 'http://localhost:5000/api';
```

## 🧪 Testing

### Test Backend APIs
```bash
# Get products
curl http://localhost:5000/api/products

# Get cart
curl http://localhost:5000/api/cart
```

### Test Frontend
1. Open `http://localhost:3000`
2. Add items to cart
3. Test checkout flow
4. Verify receipt generation

## 📋 Database Schema

### Products Table
```sql
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  image TEXT,
  description TEXT,
  category TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Cart Table
```sql
CREATE TABLE cart (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT DEFAULT 'guest-user',
  product_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  image TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🎨 Design Features

- Purple gradient navbar
- Smooth hover animations
- Card-based product layout
- Responsive grid system
- Modal overlays for checkout
- Toast notifications
- Professional color scheme

## 🐛 Known Issues & Future Improvements

- [ ] User authentication
- [ ] Real payment gateway integration
- [ ] Product search and filters
- [ ] Order history
- [ ] Multi-user cart support
- [ ] Product reviews and ratings

## 👤 Author

**Your Name**
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- Email: your.email@example.com

## 📄 License

This project is created for Vibe Commerce internship screening assignment.

## 🙏 Acknowledgments

- Images from [Unsplash](https://unsplash.com)
- Icons from Unicode emoji
- Built for Vibe Commerce internship application
```


Project Highlights:
✅ Complete REST API with 5 endpoints
✅ React frontend with 4 main components
✅ SQLite database for cart persistence
✅ Fully responsive design
✅ Error handling and validation
✅ Mock checkout with receipt generation

