# Label Collection — Mini E-Commerce App

A dark editorial streetwear mini e-commerce application built with React + Node.js + Express.

## Project Structure

```
hype-wear/
├── backend/           ← Express API (port 5001)
│   ├── server.js
│   ├── package.json
│   ├── data/
│   │   └── products.js
│   └── routes/
│       ├── productRoutes.js
│       └── orderRoutes.js
│
└── frontend/          ← Vite React App (port 5173/5174)
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── components/
        │   ├── Navbar.jsx
        │   ├── ProductCard.jsx
        │   ├── ProductGrid.jsx
        │   ├── CartItem.jsx
        │   └── ProtectedRoute.jsx
        ├── context/
        │   ├── CartContext.jsx
        │   └── AuthContext.jsx
        ├── pages/
        │   ├── Home.jsx
        │   ├── Products.jsx
        │   ├── ProductDetails.jsx
        │   ├── Cart.jsx
        │   ├── Orders.jsx
        │   ├── Login.jsx
        │   └── NotFound.jsx
        ├── styles/
        │   └── global.css
        ├── App.jsx
        └── main.jsx
```

## Quick Start

### 1. Backend

```bash
cd backend
npm install
npm start
# API runs at http://localhost:5001
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
# App runs at http://localhost:5173
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | All 10 Label Collection products |
| GET | `/api/products/:id` | Single product (404 if not found) |
| POST | `/api/orders` | Place an order (requires auth header) |
| GET | `/api/orders` | Get user's order history (requires auth) |

## Authentication

Login with any valid email address and a password of 6+ characters.

The auth token is stored in `localStorage` and sent to the backend as:
```
Authorization: Bearer <base64-encoded-user-json>
```

## Features

- ✅ 10 Label Collection products with editorial photography
- ✅ Category filtering (Tops, Bottoms, Outerwear, Footwear, Accessories, Headwear)
- ✅ Fully functional cart with quantity control and stock validation
- ✅ Protected order flow — must be logged in to place orders
- ✅ Server-side order total calculation (never trusts frontend)
- ✅ Order history page per user
- ✅ Custom 404 pages for invalid products and invalid URLs
- ✅ Loading, error, and empty states throughout
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark editorial streetwear aesthetic
