const express = require('express');
const router = express.Router();
const products = require('../data/products');

// GET /api/products — return full catalogue
router.get('/', (req, res) => {
  res.json(products);
});

// GET /api/products/:id — return single product
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
});

module.exports = router;
