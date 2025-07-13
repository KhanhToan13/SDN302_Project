const express = require('express');
const router = express.Router();

// Import các router con
const authRoutes = require('./auth.routes');
const productRoutes = require('./product.routes');
const orderRoutes = require('./order.routes');

// Sử dụng các router con với tiền tố tương ứng
// VD: Các route trong authRoutes sẽ có dạng /api/auth/...
router.use('/auth', authRoutes);

// VD: Các route trong productRoutes sẽ có dạng /api/products/...
router.use('/products', productRoutes);

// VD: Các route trong orderRoutes sẽ có dạng /api/orders/...
router.use('/orders', orderRoutes);

module.exports = router;