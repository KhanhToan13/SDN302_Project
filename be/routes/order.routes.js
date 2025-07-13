const express = require('express');
const router = express.Router();
const {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
} = require('../controllers/order.controller');
const { protect, admin } = require('../middlewares/auth.middleware');

// POST /api/orders : Tạo đơn hàng mới (người dùng đã đăng nhập)
router.post('/', protect, createOrder);

// GET /api/orders/myorders : Lấy đơn hàng của tôi (người dùng đã đăng nhập)
router.get('/myorders', protect, getMyOrders);

// GET /api/orders : Lấy tất cả đơn hàng (chỉ admin)
router.get('/', protect, admin, getAllOrders);

// PUT /api/orders/:id/status : Cập nhật trạng thái đơn hàng (chỉ admin)
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;