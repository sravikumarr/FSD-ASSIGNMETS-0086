const express = require('express');
const router = express.Router();
const products = require('../data/products');

// In-memory order store
const orders = [];
let orderIdCounter = 1;

// ─── Auth Middleware ───────────────────────────────────────────────────────────
// Expects: Authorization: Bearer <base64-encoded-json-user>
function authenticateUser(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Unauthorized. Please log in to continue.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
    if (!decoded || !decoded.email) {
      throw new Error('Invalid token payload');
    }
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired session. Please log in again.' });
  }
}

// ─── POST /api/orders ─────────────────────────────────────────────────────────
router.post('/', authenticateUser, (req, res) => {
  const { items } = req.body;

  // 1. Cart must not be empty
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Cannot place an empty order.' });
  }

  const orderItems = [];
  let total = 0;

  // 2. Validate each line item
  for (const item of items) {
    const product = products.find((p) => p.id === Number(item.productId));

    if (!product) {
      return res.status(404).json({
        message: `Product ID ${item.productId} does not exist.`
      });
    }

    const requestedQty = Number(item.quantity);

    if (!Number.isInteger(requestedQty) || requestedQty <= 0) {
      return res.status(400).json({
        message: `Invalid quantity for "${product.name}".`
      });
    }

    if (requestedQty > product.stock) {
      return res.status(400).json({
        message: `Only ${product.stock} unit${product.stock === 1 ? '' : 's'} of "${product.name}" are available.`
      });
    }

    // 3. Deduct stock (mutates in-memory catalogue)
    product.stock -= requestedQty;

    // 4. Calculate server-side — never trust the frontend total
    const subtotal = product.price * requestedQty;
    total += subtotal;

    orderItems.push({
      productId: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      quantity: requestedQty,
      subtotal,
      image: product.image
    });
  }

  // 5. Build and persist order
  const order = {
    id: `LC-${String(orderIdCounter++).padStart(4, '0')}`,
    userId: req.user.email,
    items: orderItems,
    total,
    status: 'PLACED',
    createdAt: new Date().toISOString()
  };

  orders.push(order);

  return res.status(201).json(order);
});

// ─── GET /api/orders ──────────────────────────────────────────────────────────
router.get('/', authenticateUser, (req, res) => {
  const userOrders = orders
    .filter((o) => o.userId === req.user.email)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json(userOrders);
});

module.exports = router;
