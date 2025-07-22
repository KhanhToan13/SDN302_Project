const express = require('express');
const router = express.Router();

// Chỉ còn lại product và order routes
const productRoutes = require('./product.routes');
const orderRoutes = require('./order.routes');

router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

module.exports = router;
