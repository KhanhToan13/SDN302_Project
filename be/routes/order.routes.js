const express = require('express');
const router = express.Router();
const {
    createOrder,
    getAllOrders,
    updateOrderStatus
} = require('../controllers/order.controller');

// Tất cả các route giờ đều là public
router.post('/', createOrder);
router.get('/', getAllOrders); // Bỏ protect, admin
router.put('/:id/status', updateOrderStatus); // Bỏ protect, admin

module.exports = router;
